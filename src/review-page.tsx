import { useEffect, useMemo, useReducer, useRef, useState } from 'react'
import type { ReactNode } from 'react'
import {
  BookOpen,
  Check,
  EyeOff,
  Languages,
  Layers,
  MessagesSquare,
  Minus,
  Pause,
  Play,
  Plus,
  Repeat,
  RotateCcw,
  SkipBack,
  SkipForward,
  SlidersHorizontal,
  Square,
  Timer,
  Volume2,
  X,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import type { EntriesStatus, EntryKind } from './api'
import {
  CARD_PRESETS,
  DEFAULT_REVIEW_SETTINGS,
  MAX_SECONDS,
  MIN_SECONDS,
  TRANSLATION_PRESETS,
  clampSeconds,
  loadReviewState,
  saveReviewState,
} from './review-settings'
import type { ReviewSettings, ReviewState } from './review-settings'
import { canSpeak, rankVoices, setPreferredVoice, speak, stopSpeech } from './speech'
import type { SpeechLang } from './speech'
import type { Entry } from './types'

interface ReviewPageProps {
  words: Entry[]
  expressions: Entry[]
  wordsStatus: EntriesStatus
  expressionsStatus: EntriesStatus
}

// Карточка сессии: английский текст и перевод
interface ReviewCard {
  key: string
  english: string
  translation: string
  kind: EntryKind
}

type SessionStatus = 'idle' | 'running' | 'paused' | 'finished'
type SessionPhase = 'card' | 'translation'

interface SessionState {
  status: SessionStatus
  queue: ReviewCard[]
  index: number
  phase: SessionPhase
  completed: number
  // Счётчик повтора: «назад» на первой карточке перезапускает её таймер и озвучку
  replay: number
}

type SessionAction =
  | { type: 'start'; queue: ReviewCard[] }
  | { type: 'advance'; showTranslation: boolean }
  | { type: 'prev' }
  | { type: 'next' }
  | { type: 'pause' }
  | { type: 'resume' }
  | { type: 'finish' }
  | { type: 'reset' }

const INITIAL_SESSION: SessionState = {
  status: 'idle',
  queue: [],
  index: 0,
  phase: 'card',
  completed: 0,
  replay: 0,
}

// Таймлайн тренажёра: карточка → перевод (если включён) → следующая карточка
const sessionReducer = (state: SessionState, action: SessionAction): SessionState => {
  switch (action.type) {
    case 'start':
      if (action.queue.length === 0) return INITIAL_SESSION
      return { status: 'running', queue: action.queue, index: 0, phase: 'card', completed: 0, replay: 0 }
    case 'advance': {
      if (state.status !== 'running') return state
      if (state.phase === 'card' && action.showTranslation) return { ...state, phase: 'translation' }
      const next = state.index + 1
      if (next >= state.queue.length) {
        return {
          ...state,
          status: 'finished',
          index: state.queue.length,
          phase: 'card',
          completed: state.queue.length,
        }
      }
      return { ...state, index: next, phase: 'card', completed: next }
    }
    case 'pause':
      return state.status === 'running' ? { ...state, status: 'paused' } : state
    case 'resume':
      return state.status === 'paused' ? { ...state, status: 'running' } : state
    case 'prev': {
      if (state.status !== 'running' && state.status !== 'paused') return state
      // На первой карточке — начинаем её заново
      if (state.index <= 0) return { ...state, status: 'running', phase: 'card', replay: state.replay + 1 }
      return {
        ...state,
        status: 'running',
        index: state.index - 1,
        phase: 'card',
        completed: state.index - 1,
      }
    }
    case 'next': {
      if (state.status !== 'running' && state.status !== 'paused') return state
      const next = state.index + 1
      if (next >= state.queue.length) {
        return {
          ...state,
          status: 'finished',
          index: state.queue.length,
          phase: 'card',
          completed: state.queue.length,
        }
      }
      return { ...state, status: 'running', index: next, phase: 'card', completed: next }
    }
    case 'finish':
      if (state.status === 'idle' || state.status === 'finished') return state
      return {
        ...state,
        status: 'finished',
        phase: 'card',
        completed: Math.min(state.index + 1, state.queue.length),
      }
    case 'reset':
      return INITIAL_SESSION
  }
}

// Перемешивание Фишера — Йетса: каждая сессия идёт в случайном порядке
const shuffle = (items: readonly ReviewCard[]): ReviewCard[] => {
  const result = [...items]
  for (let i = result.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1))
    const current = result[i]
    result[i] = result[j]
    result[j] = current
  }
  return result
}

// Русские формы: 1 карточка, 2 карточки, 5 карточек
const cardCountLabel = (count: number): string => {
  const mod10 = count % 10
  const mod100 = count % 100
  if (mod10 === 1 && mod100 !== 11) return `${count} карточка`
  if (mod10 >= 2 && mod10 <= 4 && (mod100 < 12 || mod100 > 14)) return `${count} карточки`
  return `${count} карточек`
}

// «≈ 45 с», «≈ 2 мин», «≈ 1 мин 20 с»
const formatDuration = (milliseconds: number): string => {
  const totalSeconds = Math.max(1, Math.round(milliseconds / 1000))
  const minutes = Math.floor(totalSeconds / 60)
  const seconds = totalSeconds % 60
  if (minutes === 0) return `${totalSeconds} с`
  if (seconds === 0) return `${minutes} мин`
  return `${minutes} мин ${seconds} с`
}

const sourceLabel = (settings: ReviewSettings): string => {
  if (settings.words && settings.expressions) return 'Слова и выражения'
  if (settings.words) return 'Только слова'
  if (settings.expressions) return 'Только выражения'
  return 'Ничего не выбрано'
}

const outlineButton =
  'inline-flex items-center justify-center gap-2 rounded-[0.85rem] border border-[#d5e4db] bg-white px-4 py-[0.65rem] text-sm font-semibold text-[#3e5649] transition-colors hover:border-[#16a34a] hover:text-[#15803d]'

const FINISH_CIRCUMFERENCE = 2 * Math.PI * 52

interface KindOptionProps {
  icon: LucideIcon
  label: string
  count: number
  checked: boolean
  onChange: (checked: boolean) => void
}

const KindOption = ({ icon: Icon, label, count, checked, onChange }: KindOptionProps) => (
  <button
    type="button"
    aria-pressed={checked}
    onClick={() => onChange(!checked)}
    className={`flex items-center gap-3 rounded-2xl border p-3.5 text-left transition-all duration-200 ${
      checked
        ? 'border-[#16a34a]/60 bg-gradient-to-br from-[#f0faf4] to-[#e0f3e8] shadow-[0_10px_24px_-18px_rgba(22,101,52,0.6)]'
        : 'border-[#e0eae4] bg-white hover:border-[#16a34a]/40'
    }`}>
    <span
      className={`grid h-10 w-10 shrink-0 place-items-center rounded-2xl transition-colors ${
        checked
          ? 'bg-gradient-to-br from-[#22c55e] to-[#15803d] text-white shadow-[0_8px_18px_-10px_rgba(21,128,61,0.9)]'
          : 'bg-[#f4f7fb] text-[#8b9aab]'
      }`}>
      <Icon size={18} aria-hidden="true" />
    </span>
    <span className="min-w-0 flex-1">
      <span className="block text-sm font-semibold text-stone-800">{label}</span>
      <span className="block text-xs text-stone-400">{cardCountLabel(count)}</span>
    </span>
    <span
      className={`grid h-6 w-6 shrink-0 place-items-center rounded-full border transition-colors ${
        checked ? 'border-[#16a34a] bg-[#16a34a] text-white' : 'border-stone-300 text-transparent'
      }`}
      aria-hidden="true">
      <Check size={14} />
    </span>
  </button>
)

interface ToggleProps {
  label: string
  hint?: string
  checked: boolean
  disabled?: boolean
  onChange: (checked: boolean) => void
}

const Toggle = ({ label, hint, checked, disabled = false, onChange }: ToggleProps) => (
  <button
    type="button"
    role="switch"
    aria-checked={checked}
    disabled={disabled}
    onClick={() => onChange(!checked)}
    className={`flex w-full items-center justify-between gap-3 rounded-2xl border p-3.5 text-left transition-colors ${
      checked ? 'border-[#16a34a]/50 bg-[#f3faf6]' : 'border-[#e0eae4] bg-white'
    } ${disabled ? 'cursor-not-allowed opacity-50' : 'hover:border-[#16a34a]/50'}`}>
    <span className="min-w-0">
      <span className="block text-sm font-semibold text-stone-800">{label}</span>
      {hint ? <span className="mt-0.5 block text-xs leading-snug text-stone-500">{hint}</span> : null}
    </span>
    <span
      className={`relative h-6 w-11 shrink-0 rounded-full transition-all duration-200 ${
        checked
          ? 'bg-gradient-to-r from-[#4ade80] to-[#16a34a] shadow-[0_6px_14px_-8px_rgba(22,163,74,0.9)]'
          : 'bg-stone-300'
      }`}
      aria-hidden="true">
      <span
        className={`absolute left-0.5 top-0.5 h-5 w-5 rounded-full bg-white shadow-sm transition-transform duration-200 ${
          checked ? 'translate-x-5' : 'translate-x-0'
        }`}
      />
    </span>
  </button>
)

interface SectionHeadProps {
  icon: LucideIcon
  step: string
  title: string
  hint?: string
}

// Заголовок блока настроек: номер шага + иконка + понятное название
const SectionHead = ({ icon: Icon, step, title, hint }: SectionHeadProps) => (
  <div className="flex items-start gap-3">
    <span className="tabular grid h-8 w-8 shrink-0 place-items-center rounded-xl bg-[#16382d] font-display text-sm text-white">
      {step}
    </span>
    <span className="grid h-8 w-8 shrink-0 place-items-center rounded-xl bg-[#e8f5ee] text-[#16a34a]">
      <Icon size={15} aria-hidden="true" />
    </span>
    <div className="min-w-0">
      <p className="text-sm font-semibold text-stone-800">{title}</p>
      {hint ? <p className="mt-0.5 text-xs leading-snug text-stone-500">{hint}</p> : null}
    </div>
  </div>
)

// Карточка-блок: белая панель с номером шага, чтобы настройки читались сверху вниз
const SettingsBlock = ({ children, note }: { children: ReactNode; note?: ReactNode }) => (
  <div className="anim-rise rounded-3xl border border-[#e0eae4] bg-white p-4 shadow-[0_1px_2px_rgba(16,24,40,0.05)] sm:p-5">
    {children}
    {note ? <div className="mt-3">{note}</div> : null}
  </div>
)

interface SecondsControlProps {
  presets: readonly number[]
  value: number
  draft: string
  ariaLabel: string
  disabled?: boolean
  onSelect: (seconds: number) => void
  onStep: (delta: number) => void
  onDraft: (value: string) => void
  onBlur: () => void
}

// Пресеты-сегменты плюс степпер для своего значения
const SecondsControl = ({
  presets,
  value,
  draft,
  ariaLabel,
  disabled = false,
  onSelect,
  onStep,
  onDraft,
  onBlur,
}: SecondsControlProps) => (
  <div className="flex flex-wrap items-center gap-2.5">
    <div className={`segmented ${disabled ? 'is-disabled' : ''}`} role="group" aria-label={ariaLabel}>
      {presets.map((seconds) => (
        <button
          key={seconds}
          type="button"
          disabled={disabled}
          aria-pressed={value === seconds}
          onClick={() => onSelect(seconds)}
          className={value === seconds ? 'is-on' : ''}>
          {seconds}с
        </button>
      ))}
    </div>
    <div className={`stepper ${disabled ? 'is-disabled' : ''}`}>
      <button
        type="button"
        onClick={() => onStep(-1)}
        disabled={disabled || value <= MIN_SECONDS}
        aria-label="Минус одна секунда">
        <Minus size={13} aria-hidden="true" />
      </button>
      <input
        type="number"
        inputMode="numeric"
        min={MIN_SECONDS}
        max={MAX_SECONDS}
        value={draft}
        disabled={disabled}
        aria-label={`${ariaLabel}: своё значение в секундах`}
        onChange={(event) => onDraft(event.target.value)}
        onBlur={onBlur}
      />
      <button
        type="button"
        onClick={() => onStep(1)}
        disabled={disabled || value >= MAX_SECONDS}
        aria-label="Плюс одна секунда">
        <Plus size={13} aria-hidden="true" />
      </button>
    </div>
  </div>
)

// Страница повторения: старт по центру, настройки в шапке, тёмная сцена сессии
const ReviewPage = ({ words, expressions, wordsStatus, expressionsStatus }: ReviewPageProps) => {
  const [state, setState] = useState<ReviewState>(() => loadReviewState())
  const [session, dispatch] = useReducer(sessionReducer, INITIAL_SESSION)
  const [isSettingsOpen, setIsSettingsOpen] = useState(false)
  const [cardDraft, setCardDraft] = useState('')
  const [translationDraft, setTranslationDraft] = useState('')
  // Доступные голоса подгружаются асинхронно — храним снимок для селектов
  const [voiceSnapshot, setVoiceSnapshot] = useState<SpeechSynthesisVoice[]>(() =>
    canSpeak ? window.speechSynthesis.getVoices() : []
  )

  const settings = state.settings

  // Голоса в селектах — от лучшего к худшему
  const enVoices = useMemo(() => rankVoices('en-US'), [voiceSnapshot])
  const ruVoices = useMemo(() => rankVoices('ru-RU'), [voiceSnapshot])

  // Остаток текущей фазы при паузе: null — фаза только началась
  const resumeRef = useRef<number | null>(null)
  const deadlineRef = useRef(0)
  const statusRef = useRef(session.status)
  // Первую фразу озвучиваем прямо в жесте пользователя, эффект её пропускает
  const skipVoiceRef = useRef(false)
  // Токен текущей озвучки: пауза и финиш гасят чужие колбэки onend
  const narrationRef = useRef(0)
  const settingsRef = useRef(settings)
  const pauseRef = useRef<() => void>(() => {})
  const stepRef = useRef<(delta: -1 | 1) => void>(() => {})

  // Голосовой режим: переход по окончании озвучки вместо таймеров
  const voiceFlow = settings.voiceAdvance && canSpeak

  const isSessionActive = session.status === 'running' || session.status === 'paused'

  const wordCards = useMemo<ReviewCard[]>(
    () =>
      words.map((entry) => ({
        key: `words-${entry.id}`,
        english: entry.english,
        translation: entry.translation,
        kind: 'words',
      })),
    [words]
  )

  const expressionCards = useMemo<ReviewCard[]>(
    () =>
      expressions.map((entry) => ({
        key: `expressions-${entry.id}`,
        english: entry.english,
        translation: entry.translation,
        kind: 'expressions',
      })),
    [expressions]
  )

  const pool = useMemo<ReviewCard[]>(() => {
    if (settings.words && settings.expressions) return [...wordCards, ...expressionCards]
    if (settings.words) return wordCards
    if (settings.expressions) return expressionCards
    return []
  }, [settings.words, settings.expressions, wordCards, expressionCards])

  const hasSource = settings.words || settings.expressions
  const cardCount = pool.length
  const canStart = cardCount > 0
  const isLoading = wordsStatus === 'loading' || expressionsStatus === 'loading'
  const hasLoadError =
    (settings.words && wordsStatus === 'error' && words.length === 0) ||
    (settings.expressions && expressionsStatus === 'error' && expressions.length === 0)

  const startHint = !hasSource
    ? 'Выберите, что повторять: слова или выражения.'
    : isLoading
      ? 'Загружаем карточки…'
      : hasLoadError
        ? 'Записи не загрузились. Проверьте сервер и обновите страницу.'
        : 'В выбранных разделах пока нет записей.'

  // Оценка длительности сессии: карточка плюс перевод, если он включён
  const estimateMs =
    cardCount * (settings.cardSeconds + (settings.showTranslation ? settings.translationSeconds : 0)) * 1000

  const summaryItems = useMemo<{ icon: LucideIcon; label: string }[]>(() => {
    const items: { icon: LucideIcon; label: string }[] = [
      { icon: Repeat, label: sourceLabel(settings) },
      voiceFlow
        ? { icon: Volume2, label: 'переход по озвучке' }
        : { icon: Timer, label: `до перевода ${settings.cardSeconds} с` },
    ]
    if (!settings.showTranslation) {
      items.push({ icon: EyeOff, label: 'без перевода' })
    } else if (voiceFlow && settings.voiceTranslation) {
      items.push({ icon: Languages, label: 'перевод с озвучкой' })
    } else {
      items.push({ icon: Languages, label: `перевод ${settings.translationSeconds} с` })
    }
    if (settings.voiceEnglish) items.push({ icon: Volume2, label: 'озвучка слов' })
    if (settings.showTranslation && settings.voiceTranslation) {
      items.push({ icon: Volume2, label: 'озвучка перевода' })
    }
    return items
  }, [settings, voiceFlow])

  const current = session.index < session.queue.length ? session.queue[session.index] : undefined
  const currentNumber = Math.min(session.index + 1, session.queue.length)

  const phaseDuration =
    (session.phase === 'card' ? settings.cardSeconds : settings.translationSeconds) * 1000

  const progressPercent = session.queue.length > 0 ? (session.index / session.queue.length) * 100 : 0
  const finishPercent =
    session.queue.length > 0 ? Math.round((session.completed / session.queue.length) * 100) : 0

  // Кольцо-таймер: в голосовых фазах длительность неизвестна — крутится спиннер
  const ringSpin = voiceFlow && (session.phase === 'card' || settings.voiceTranslation)

  const phaseHint = !voiceFlow
    ? session.phase === 'card'
      ? settings.showTranslation
        ? `Перевод через ${settings.cardSeconds} с`
        : `Следующая через ${settings.cardSeconds} с`
      : `Дальше через ${settings.translationSeconds} с`
    : session.phase === 'card'
      ? settings.showTranslation
        ? 'Перевод — после озвучки'
        : 'Дальше — после озвучки'
      : settings.voiceTranslation
        ? 'Дальше — после озвучки'
        : `Дальше через ${settings.translationSeconds} с`

  // Страховка: если браузер не пришлёт onend, двигаемся по оценке длительности
  const estimateSpeechMs = (text: string, lang: SpeechLang): number => {
    const perChar = lang === 'ru-RU' ? 100 : 110
    const estimated = text.trim().length * perChar + 3000
    return Math.min(15000, Math.max(5000, estimated))
  }

  // Финал озвучки: двигает дальше только актуальную фразу
  const completeVoice = (voiceId: number): void => {
    if (narrationRef.current !== voiceId) return
    narrationRef.current = voiceId + 1
    dispatch({ type: 'advance', showTranslation: settingsRef.current.showTranslation })
  }

  // Озвучка с переходом по её окончании: сначала голос, потом страховка по времени
  const playVoice = (text: string, lang: SpeechLang): void => {
    if (!canSpeak) return
    const voiceId = narrationRef.current + 1
    narrationRef.current = voiceId
    speak(text, lang, () => completeVoice(voiceId))
    window.setTimeout(() => completeVoice(voiceId), estimateSpeechMs(text, lang))
  }

  // Обрыв озвучки: чужие onend и таймеры-страховки гаснут по токену
  const stopNarration = (): void => {
    narrationRef.current += 1
    stopSpeech()
  }

  // Фаза на таймере: в голосовом режиме это только неозвученный перевод
  const isPhaseTimed = (phase: SessionPhase): boolean => {
    if (!voiceFlow) return true
    return phase === 'translation' && !settings.voiceTranslation
  }

  // Настройки сохраняем при каждом изменении — при следующем визите всё уже выбрано
  useEffect(() => {
    saveReviewState(state)
  }, [state])

  useEffect(() => {
    statusRef.current = session.status
  }, [session.status])

  useEffect(() => {
    settingsRef.current = settings
  }, [settings])

  // Свежая пауза и свежий шаг для фоновой вкладки и клавиатуры: замыкание последнего рендера
  useEffect(() => {
    pauseRef.current = handlePause
    stepRef.current = handleStep
  })

  // Прогреваем список голосов: на части браузеров он пустой до первого события voiceschanged
  useEffect(() => {
    if (!canSpeak) return
    setVoiceSnapshot(window.speechSynthesis.getVoices())
    const prime = (): void => {
      setVoiceSnapshot(window.speechSynthesis.getVoices())
    }
    window.speechSynthesis.addEventListener('voiceschanged', prime)
    return () => window.speechSynthesis.removeEventListener('voiceschanged', prime)
  }, [])

  // Выбранные в настройках голоса уходят в движок озвучки
  useEffect(() => {
    setPreferredVoice('en-US', settings.voiceEnUri || null)
    setPreferredVoice('ru-RU', settings.voiceRuUri || null)
  }, [settings.voiceEnUri, settings.voiceRuUri])

  // Уходя со страницы, обрываем озвучку и гасим её колбэки
  useEffect(
    () => () => {
      narrationRef.current += 1
      stopSpeech()
    },
    []
  )

  // Таймер фазы: остаток хранится в ref, пауза только сдвигает дедлайн.
  // Голосовые фазы таймера не имеют — их двигает конец озвучки.
  useEffect(() => {
    if (session.status !== 'running') return
    if (voiceFlow && (session.phase === 'card' || settings.voiceTranslation)) return
    const saved = resumeRef.current
    resumeRef.current = null
    const duration = saved ?? phaseDuration
    deadlineRef.current = Date.now() + duration
    const timer = window.setTimeout(() => {
      dispatch({ type: 'advance', showTranslation: settingsRef.current.showTranslation })
    }, duration)
    return () => window.clearTimeout(timer)
  }, [session.status, session.index, session.phase, session.replay, phaseDuration, settings.voiceTranslation, voiceFlow])

  // Озвучка стартует вместе с фазой: в голосовом режиме она же двигает дальше
  useEffect(() => {
    if (session.status !== 'running' || !current) return
    if (skipVoiceRef.current) {
      skipVoiceRef.current = false
      return
    }
    if (session.phase === 'card') {
      if (voiceFlow) {
        playVoice(current.english, 'en-US')
        return
      }
      if (settings.voiceEnglish) speak(current.english, 'en-US')
      return
    }
    if (!settings.showTranslation) return
    if (voiceFlow) {
      if (settings.voiceTranslation) playVoice(current.translation, 'ru-RU')
      return
    }
    if (settings.voiceTranslation) speak(current.translation, 'ru-RU')
  }, [session.status, session.phase, session.replay, current, settings.voiceEnglish, settings.voiceAdvance, settings.voiceTranslation, settings.showTranslation, voiceFlow])

  // Скрытая вкладка замораживает сессию, чтобы карточки не «убегали» в фоне
  useEffect(() => {
    const handleVisibility = (): void => {
      if (document.visibilityState !== 'hidden' || statusRef.current !== 'running') return
      pauseRef.current()
    }
    document.addEventListener('visibilitychange', handleVisibility)
    return () => document.removeEventListener('visibilitychange', handleVisibility)
  }, [])

  // Escape закрывает настройки
  useEffect(() => {
    if (!isSettingsOpen) return
    const handleKey = (event: KeyboardEvent): void => {
      if (event.key !== 'Escape') return
      setIsSettingsOpen(false)
    }
    document.addEventListener('keydown', handleKey)
    return () => document.removeEventListener('keydown', handleKey)
  }, [isSettingsOpen])

  // Стрелки на клавиатуре листают карточки, пока идёт сессия
  useEffect(() => {
    if (!isSessionActive || isSettingsOpen) return
    const handleKey = (event: KeyboardEvent): void => {
      if (event.key === 'ArrowLeft') {
        event.preventDefault()
        stepRef.current(-1)
      } else if (event.key === 'ArrowRight') {
        event.preventDefault()
        stepRef.current(1)
      }
    }
    document.addEventListener('keydown', handleKey)
    return () => document.removeEventListener('keydown', handleKey)
  }, [isSessionActive, isSettingsOpen])

  // Модалка фиксирует страницу: на телефоне overflow: hidden фон не держит
  useEffect(() => {
    if (!isSettingsOpen) return
    const html = document.documentElement
    const main = document.getElementById('main-scroll')
    const scrollY = window.scrollY
    const mainTop = main?.scrollTop ?? 0
    const prevMain = main?.style.overflow ?? ''
    html.classList.add('scroll-lock')
    document.body.style.top = `-${scrollY}px`
    if (main) main.style.overflow = 'hidden'
    return () => {
      html.classList.remove('scroll-lock')
      document.body.style.top = ''
      if (main) main.style.overflow = prevMain
      window.scrollTo(0, scrollY)
      if (main) main.scrollTop = mainTop
    }
  }, [isSettingsOpen])

  const updateSettings = (patch: Partial<ReviewSettings>): void => {
    setState((currentState) => ({
      ...currentState,
      settings: { ...currentState.settings, ...patch },
    }))
  }

  const openSettings = (): void => {
    setCardDraft(String(settings.cardSeconds))
    setTranslationDraft(String(settings.translationSeconds))
    setIsSettingsOpen(true)
  }

  const closeSettings = (): void => {
    setIsSettingsOpen(false)
  }

  const resetSettings = (): void => {
    updateSettings({ ...DEFAULT_REVIEW_SETTINGS })
    setCardDraft(String(DEFAULT_REVIEW_SETTINGS.cardSeconds))
    setTranslationDraft(String(DEFAULT_REVIEW_SETTINGS.translationSeconds))
  }

  const selectCardSeconds = (seconds: number): void => {
    updateSettings({ cardSeconds: seconds })
    setCardDraft(String(seconds))
  }

  const selectTranslationSeconds = (seconds: number): void => {
    updateSettings({ translationSeconds: seconds })
    setTranslationDraft(String(seconds))
  }

  const stepCardSeconds = (delta: number): void => {
    selectCardSeconds(clampSeconds(settings.cardSeconds + delta, settings.cardSeconds))
  }

  const stepTranslationSeconds = (delta: number): void => {
    selectTranslationSeconds(clampSeconds(settings.translationSeconds + delta, settings.translationSeconds))
  }

  const handleCardDraft = (value: string): void => {
    setCardDraft(value)
    const parsed = Number(value.replace(',', '.'))
    if (value.trim() === '' || !Number.isFinite(parsed)) return
    updateSettings({ cardSeconds: clampSeconds(parsed, settings.cardSeconds) })
  }

  const handleTranslationDraft = (value: string): void => {
    setTranslationDraft(value)
    const parsed = Number(value.replace(',', '.'))
    if (value.trim() === '' || !Number.isFinite(parsed)) return
    updateSettings({ translationSeconds: clampSeconds(parsed, settings.translationSeconds) })
  }

  // Выключая перевод, гасим и его озвучку — озвучивать нечего
  const handleShowTranslation = (value: boolean): void => {
    updateSettings(value ? { showTranslation: true } : { showTranslation: false, voiceTranslation: false })
  }

  // Включая голосовой режим, включаем и английскую озвучку — иначе листать нечему
  const handleVoiceMode = (value: boolean): void => {
    updateSettings(value ? { voiceAdvance: true, voiceEnglish: true } : { voiceAdvance: false })
  }

  // Первую фразу озвучиваем синхронно в жесте — это разблокирует синтез речи на iOS
  const beginSession = (source: ReviewCard[]): void => {
    if (source.length === 0) return
    stopNarration()
    resumeRef.current = null
    const queue = shuffle(source)
    const first = queue[0]
    if (canSpeak && first !== undefined) {
      if (voiceFlow) {
        skipVoiceRef.current = true
        playVoice(first.english, 'en-US')
      } else if (settings.voiceEnglish) {
        skipVoiceRef.current = true
        speak(first.english, 'en-US')
      }
    }
    dispatch({ type: 'start', queue })
  }

  const handleStart = (): void => {
    beginSession(pool)
  }

  const handleRestart = (): void => {
    beginSession(session.queue.length > 0 ? session.queue : pool)
  }

  const handlePause = (): void => {
    if (session.status !== 'running') return
    // Остаток нужен только фазе на таймере; голосовая фаза начнётся заново
    resumeRef.current = isPhaseTimed(session.phase)
      ? Math.max(0, deadlineRef.current - Date.now())
      : null
    stopNarration()
    dispatch({ type: 'pause' })
  }

  // Шаг по карточкам: озвучиваем новую в том же жесте и продолжаем с неё
  const handleStep = (delta: -1 | 1): void => {
    if (session.status !== 'running' && session.status !== 'paused') return
    const target = delta === -1 ? Math.max(0, session.index - 1) : session.index + 1
    stopNarration()
    resumeRef.current = null
    if (delta === 1 && target >= session.queue.length) {
      dispatch({ type: 'next' })
      return
    }
    const card = session.queue[target]
    if (canSpeak && card !== undefined && (voiceFlow || settings.voiceEnglish)) {
      if (voiceFlow) playVoice(card.english, 'en-US')
      else speak(card.english, 'en-US')
      skipVoiceRef.current = true
    }
    dispatch(delta === -1 ? { type: 'prev' } : { type: 'next' })
  }

  const handleResume = (): void => {
    if (session.status !== 'paused') return
    // Продолжаем с той же фразы, снова из жеста — так надёжнее для синтеза речи
    if (canSpeak && current) {
      if (voiceFlow && session.phase === 'card') {
        playVoice(current.english, 'en-US')
        skipVoiceRef.current = true
      } else if (voiceFlow && session.phase === 'translation' && settings.voiceTranslation) {
        playVoice(current.translation, 'ru-RU')
        skipVoiceRef.current = true
      } else if (!voiceFlow && session.phase === 'card' && settings.voiceEnglish) {
        speak(current.english, 'en-US')
        skipVoiceRef.current = true
      } else if (
        !voiceFlow &&
        session.phase === 'translation' &&
        settings.showTranslation &&
        settings.voiceTranslation
      ) {
        speak(current.translation, 'ru-RU')
        skipVoiceRef.current = true
      }
    }
    dispatch({ type: 'resume' })
  }

  const handleFinish = (): void => {
    stopNarration()
    resumeRef.current = null
    dispatch({ type: 'finish' })
  }

  const handleReset = (): void => {
    stopNarration()
    resumeRef.current = null
    dispatch({ type: 'reset' })
  }

  return (
    <>
      <section className="flex min-h-0 flex-1 flex-col">
        {!isSessionActive && (
          <header className="flex shrink-0 items-start justify-between gap-4">
            <div>
              <p className="eyebrow text-[#7d8b9c]">Тренажёр карточек</p>
              <h1 className="font-display mt-2 text-3xl leading-none text-[var(--tide)] sm:text-4xl">Повторение</h1>
              <p className="mt-2 max-w-md text-sm leading-relaxed text-[#5d6e82]">
                Карточки листаются сами: слово, озвучка и перевод — в вашем ритме.
              </p>
            </div>
            <button
              type="button"
              onClick={openSettings}
              aria-haspopup="dialog"
              aria-label="Настройки повторения"
              className="group inline-flex shrink-0 items-center gap-2 rounded-2xl border border-[#d5e4db] bg-white px-3 py-2.5 text-sm font-semibold text-[#3e5649] shadow-[0_12px_28px_-18px_rgba(22,101,52,0.55)] transition duration-200 hover:-translate-y-0.5 hover:border-[#16a34a] hover:text-[#15803d] hover:shadow-[0_18px_34px_-18px_rgba(22,101,52,0.7)] sm:px-3.5">
              <span className="grid h-7 w-7 place-items-center rounded-xl bg-[#e8f5ee] text-[#16a34a] transition-colors group-hover:bg-[#16a34a] group-hover:text-white">
                <SlidersHorizontal size={16} aria-hidden="true" />
              </span>
              <span className="hidden sm:inline">Настройки</span>
            </button>
          </header>
        )}

        {/* Старт: орбита с кнопкой, оценка времени и сводка настроек */}
        {session.status === 'idle' && (
          <div className="flex min-h-0 flex-1 flex-col items-center justify-center gap-8 py-6">
            <div className={`start-orbit review-fade-up ${canStart ? '' : 'is-off'}`}>
              <button
                type="button"
                onClick={handleStart}
                disabled={!canStart}
                aria-label="Начать повторение"
                className={`grid h-36 w-36 place-items-center rounded-full border-4 border-white text-white shadow-[0_24px_50px_-20px_rgba(21,128,61,0.65)] transition-all duration-200 sm:h-40 sm:w-40 ${
                  canStart
                    ? 'review-pulse bg-gradient-to-br from-[#4ade80] via-[#22c55e] to-[#15803d] hover:scale-105 active:scale-95'
                    : 'cursor-not-allowed bg-gradient-to-br from-stone-300 to-stone-400'
                }`}>
                <Play size={48} fill="currentColor" aria-hidden="true" className="translate-x-1" />
              </button>
            </div>
            <div className="text-center">
              <h2 className="font-display text-3xl leading-tight text-[var(--tide)] sm:text-4xl">
                Начать повторение
              </h2>
              <p className="mx-auto mt-2 max-w-md text-sm text-[#5d6e82]">
                {canStart
                  ? voiceFlow
                    ? cardCountLabel(cardCount)
                    : `${cardCountLabel(cardCount)} · ≈ ${formatDuration(estimateMs)}`
                  : startHint}
              </p>
              {!hasSource && (
                <button
                  type="button"
                  onClick={openSettings}
                  className="mt-2 text-sm font-semibold text-[#15803d] underline decoration-[#16a34a]/40 underline-offset-4 hover:decoration-[#16a34a]">
                  Открыть настройки
                </button>
              )}
            </div>
            <ul className="flex w-full max-w-2xl flex-wrap items-center justify-center gap-2">
              {summaryItems.map((item) => {
                const Icon = item.icon
                return (
                  <li key={item.label} className="review-spec">
                    <Icon size={13} aria-hidden="true" />
                    {item.label}
                  </li>
                )
              })}
            </ul>
          </div>
        )}

        {/* Сессия: тёмная сцена фокуса, кольцо-таймер вокруг кнопки и док управления */}
        {isSessionActive && (
          <div className="review-stage">
            <span className="review-stage-ghost font-display" aria-hidden="true">
              Aa
            </span>
            <div className="review-progress" aria-hidden="true">
              <span style={{ width: `${progressPercent}%` }} />
            </div>
            <div className="review-hud">
              <span className={`review-live ${session.status === 'paused' ? 'is-paused' : ''}`}>
                <span className="review-live-dot" aria-hidden="true" />
                {session.status === 'paused' ? 'Пауза' : 'Идёт повторение'}
              </span>
              <p className="review-count">
                <span className="review-count-label">Карточка</span>
                <span className="review-count-now tabular">{currentNumber}</span>
                <span className="review-count-total tabular">/ {session.queue.length}</span>
              </p>
            </div>
            <div className="review-body">
              <div
                key={`${session.index}-${session.phase}-${session.replay}`}
                className="review-fade-up m-auto flex w-full flex-col items-center">
                <span className="review-chip">{current?.kind === 'words' ? 'Слово' : 'Выражение'}</span>
                <h2 className="review-word">{current?.english}</h2>
                {canSpeak && current && (
                  <button
                    type="button"
                    onClick={() => speak(current.english, 'en-US')}
                    aria-label="Прослушать слово"
                    title="Прослушать"
                    className="review-sound">
                    <Volume2 size={18} aria-hidden="true" />
                  </button>
                )}
                <div className="review-translation-slot">
                  {session.phase === 'translation' && current ? (
                    <p className="review-translation">{current.translation}</p>
                  ) : null}
                </div>
                <p className="review-hint">{phaseHint}</p>
              </div>
            </div>
            <div className="review-dock">
              <div className="review-nav-row">
                <button
                  type="button"
                  onClick={() => handleStep(-1)}
                  aria-label="Предыдущая карточка"
                  title="Назад"
                  className="review-nav">
                  <SkipBack size={20} fill="currentColor" aria-hidden="true" />
                </button>
                <button
                  type="button"
                  onClick={session.status === 'paused' ? handleResume : handlePause}
                  aria-label={session.status === 'paused' ? 'Продолжить повторение' : 'Пауза'}
                  className="review-main">
                    <svg className="review-ring" viewBox="0 0 100 100" aria-hidden="true">
                      <circle className="review-ring-track" cx="50" cy="50" r="46" />
                      <circle
                        key={`${session.index}-${session.phase}-${session.replay}`}
                        className={ringSpin ? 'review-ring-fill is-voice' : 'review-ring-fill'}
                        cx="50"
                        cy="50"
                        r="46"
                        style={
                          ringSpin
                            ? { animationPlayState: session.status === 'paused' ? 'paused' : 'running' }
                            : {
                                animationDuration: `${phaseDuration}ms`,
                                animationPlayState: session.status === 'paused' ? 'paused' : 'running',
                              }
                        }
                      />
                    </svg>
                  {session.status === 'paused' ? (
                    <Play size={22} fill="currentColor" aria-hidden="true" className="translate-x-0.5" />
                  ) : (
                    <Pause size={22} aria-hidden="true" />
                  )}
                </button>
                <button
                  type="button"
                  onClick={() => handleStep(1)}
                  aria-label="Следующая карточка"
                  title="Дальше"
                  className="review-nav">
                  <SkipForward size={20} fill="currentColor" aria-hidden="true" />
                </button>
              </div>
              <span className="review-main-label">{session.status === 'paused' ? 'Продолжить' : 'Пауза'}</span>
              <button type="button" onClick={handleFinish} className="review-finish">
                <Square size={13} aria-hidden="true" />
                Закончить
              </button>
            </div>
          </div>
        )}

        {/* Итоги сессии: кольцо прогресса и действия */}
        {session.status === 'finished' && (
          <div className="flex min-h-0 flex-1 flex-col items-center justify-center gap-7 py-8 text-center">
            <div className="review-fade-up relative h-44 w-44">
              <svg className="h-full w-full -rotate-90" viewBox="0 0 120 120" aria-hidden="true">
                <circle cx="60" cy="60" r="52" fill="none" stroke="#e3efe7" strokeWidth="9" />
                <circle
                  cx="60"
                  cy="60"
                  r="52"
                  fill="none"
                  stroke="url(#review-finish-grad)"
                  strokeWidth="9"
                  strokeLinecap="round"
                  strokeDasharray={FINISH_CIRCUMFERENCE}
                  strokeDashoffset={FINISH_CIRCUMFERENCE * (1 - finishPercent / 100)}
                  style={{ transition: 'stroke-dashoffset 0.8s cubic-bezier(0.22, 1, 0.36, 1)' }}
                />
                <defs>
                  <linearGradient id="review-finish-grad" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#4ade80" />
                    <stop offset="100%" stopColor="#15803d" />
                  </linearGradient>
                </defs>
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="tabular font-display text-4xl text-[var(--tide)]">{finishPercent}%</span>
                <span className="tabular mt-1 text-xs font-medium text-[#8aa394]">
                  {session.completed} из {session.queue.length}
                </span>
              </div>
            </div>
            <div>
              <h2 className="font-display text-3xl leading-tight sm:text-4xl">Повторение завершено</h2>
              <p className="mx-auto mt-2 max-w-sm text-sm leading-relaxed text-[#5d6e82]">
                {session.queue.length > 0 && session.completed >= session.queue.length
                  ? 'Все карточки пройдены — отличная работа.'
                  : `Просмотрено ${cardCountLabel(session.completed)} из ${session.queue.length}.`}
              </p>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-2.5">
              <button type="button" onClick={handleRestart} className="btn-primary">
                <RotateCcw size={16} aria-hidden="true" />
                Ещё раз
              </button>
              <button type="button" onClick={openSettings} className={outlineButton}>
                <SlidersHorizontal size={16} aria-hidden="true" />
                Настройки
              </button>
              <button
                type="button"
                onClick={handleReset}
                className="inline-flex items-center gap-2 rounded-[0.85rem] px-3 py-2 text-sm font-semibold text-[#8b9aab] transition-colors hover:text-[#15803d]">
                <Check size={16} aria-hidden="true" />
                Готово
              </button>
            </div>
          </div>
        )}
      </section>

      {/* Модальное окно настроек: тёмный герой, секции с иконками, автосохранение */}
      {isSettingsOpen && (
        <div
          className="fixed inset-0 z-50 flex items-end justify-center sm:items-center sm:p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="review-settings-title">
          <button type="button" aria-label="Закрыть" onClick={closeSettings} className="modal-scrim" />
          <div className="review-modal">
            <div className="review-modal-hero">
              <div className="relative flex items-start justify-between gap-3">
                <span className="review-modal-icon">
                  <SlidersHorizontal size={18} aria-hidden="true" />
                </span>
                <button
                  type="button"
                  onClick={closeSettings}
                  aria-label="Закрыть настройки"
                  className="review-modal-close">
                  <X size={17} aria-hidden="true" />
                </button>
              </div>
              <p className="relative mt-4 text-[10.5px] font-semibold uppercase tracking-[0.18em] text-[#86efac]">
                Тренажёр карточек · 4 шага
              </p>
              <h3 id="review-settings-title" className="font-display relative mt-1 text-3xl leading-tight text-white">
                Настройки повторения
              </h3>
            </div>

            <div className="min-h-0 flex-1 overflow-y-auto bg-[#f4f7f4] px-5 py-5 sm:px-7">
              <div className="grid items-start gap-4 lg:grid-cols-2">
                <div className="min-w-0 space-y-4">
                  {/* Шаг 1: что повторяем */}
                  <SettingsBlock
                    note={
                      !hasSource ? (
                        <p className="rounded-2xl bg-amber-50 px-3.5 py-2.5 text-xs font-medium leading-relaxed text-amber-700">
                          Выберите хотя бы один раздел — иначе кнопка старта будет недоступна.
                        </p>
                      ) : undefined
                    }>
                    <fieldset className="min-w-0">
                      <SectionHead
                        icon={Layers}
                        step="01"
                        title="Что повторяем?"
                        hint="Шаг 1 из 4 · можно выбрать оба раздела"
                      />
                      <div className="mt-3 grid gap-2 sm:grid-cols-2">
                        <KindOption
                          icon={BookOpen}
                          label="Слова"
                          count={words.length}
                          checked={settings.words}
                          onChange={(checked) => updateSettings({ words: checked })}
                        />
                        <KindOption
                          icon={MessagesSquare}
                          label="Выражения"
                          count={expressions.length}
                          checked={settings.expressions}
                          onChange={(checked) => updateSettings({ expressions: checked })}
                        />
                      </div>
                    </fieldset>
                  </SettingsBlock>

                  {/* Шаг 2: ритм карточки */}
                  <SettingsBlock
                    note={
                      voiceFlow ? (
                        <p className="rounded-2xl bg-[#eef7ff] px-3.5 py-2.5 text-xs leading-relaxed text-[#2b5f8a]">
                          Голосовой режим включён: таймер не нужен — карточка ждёт, пока голос договорит.
                        </p>
                      ) : (
                        <p className="rounded-2xl bg-[#f3faf6] px-3.5 py-2.5 text-xs leading-relaxed text-[#3e5649]">
                          Как это работает: видите английское слово <b>{settings.cardSeconds} с</b>
                          {settings.showTranslation ? ', затем появляется перевод' : ', затем сразу следующая'}.
                        </p>
                      )
                    }>
                    <fieldset className="min-w-0">
                      <SectionHead
                        icon={Timer}
                        step="02"
                        title="Сколько держать слово?"
                        hint="Шаг 2 из 4 · время на английском до перевода"
                      />
                      <div className="mt-3">
                        <SecondsControl
                          presets={CARD_PRESETS}
                          value={settings.cardSeconds}
                          draft={cardDraft}
                          ariaLabel="Время до следующей карточки"
                          disabled={voiceFlow}
                          onSelect={selectCardSeconds}
                          onStep={stepCardSeconds}
                          onDraft={handleCardDraft}
                          onBlur={() => setCardDraft(String(settings.cardSeconds))}
                        />
                      </div>
                      <p className="mt-2 text-xs text-stone-400">
                        Совет: новичкам — 5 с, уверенным — 2 с. Число можно вписать вручную.
                      </p>
                    </fieldset>
                  </SettingsBlock>

                  {/* Шаг 3: перевод — та же структура, что в шаге 02 */}
                  <SettingsBlock
                    note={
                      !settings.showTranslation ? (
                        <p className="rounded-2xl bg-stone-100 px-3.5 py-2.5 text-xs leading-relaxed text-stone-500">
                          Режим «только английское»: проверяете себя без подсказки.
                        </p>
                      ) : voiceFlow && settings.voiceTranslation ? (
                        <p className="rounded-2xl bg-[#eef7ff] px-3.5 py-2.5 text-xs leading-relaxed text-[#2b5f8a]">
                          Перевод держится, пока звучит — переход по окончании озвучки.
                        </p>
                      ) : voiceFlow ? (
                        <p className="rounded-2xl bg-[#f3faf6] px-3.5 py-2.5 text-xs leading-relaxed text-[#3e5649]">
                          Перевод без озвучки держится{' '}
                          <b className="tabular">{settings.translationSeconds} с</b>.
                        </p>
                      ) : (
                        <p className="rounded-2xl bg-[#f3faf6] px-3.5 py-2.5 text-xs leading-relaxed text-[#3e5649]">
                          На карточку уходит <b>{settings.cardSeconds + settings.translationSeconds} с</b>:
                          слово {settings.cardSeconds} с + перевод {settings.translationSeconds} с.
                        </p>
                      )
                    }>
                    <fieldset className="min-w-0">
                      <SectionHead
                        icon={Languages}
                        step="03"
                        title="Сколько держать перевод?"
                        hint="Шаг 3 из 4 · появляется после английского слова"
                      />
                      <div className="mt-3">
                        <Toggle
                          label="Показывать перевод"
                          hint="Сначала английский текст, затем — русский"
                          checked={settings.showTranslation}
                          onChange={handleShowTranslation}
                        />
                      </div>
                      {settings.showTranslation && (
                        <div className="mt-3">
                          <SecondsControl
                            presets={TRANSLATION_PRESETS}
                            value={settings.translationSeconds}
                            draft={translationDraft}
                            ariaLabel="Время показа перевода"
                            disabled={voiceFlow && settings.voiceTranslation}
                            onSelect={selectTranslationSeconds}
                            onStep={stepTranslationSeconds}
                            onDraft={handleTranslationDraft}
                            onBlur={() => setTranslationDraft(String(settings.translationSeconds))}
                          />
                        </div>
                      )}
                      <p className="mt-2 text-xs text-stone-400">
                        {settings.showTranslation
                          ? 'Число можно вписать вручную.'
                          : 'Включите — появится выбор времени.'}
                      </p>
                    </fieldset>
                  </SettingsBlock>
                </div>

                <div className="min-w-0 space-y-4">
                  {/* Шаг 4: озвучка */}
                  <SettingsBlock
                    note={
                      !canSpeak ? (
                        <p className="rounded-2xl bg-stone-100 px-3.5 py-2.5 text-xs leading-relaxed text-stone-500">
                          Браузер не поддерживает синтез речи — озвучка недоступна.
                        </p>
                      ) : !voiceFlow ? (
                        <p className="rounded-2xl bg-[#f3faf6] px-3.5 py-2.5 text-xs leading-relaxed text-[#3e5649]">
                          Обычный режим: карточки листаются по таймеру, голос — просто подсказка поверх.
                        </p>
                      ) : undefined
                    }>
                    <fieldset className="min-w-0">
                      <SectionHead
                        icon={Volume2}
                        step="04"
                        title="Озвучка и автолистание"
                        hint="Шаг 4 из 4 · голос браузера, ничего устанавливать не надо"
                      />
                      <div className="mt-3 grid gap-2">
                        <Toggle
                          label="Листать, когда голос договорит"
                          hint="Голосовой режим: время не задаётся"
                          checked={settings.voiceAdvance}
                          disabled={!canSpeak}
                          onChange={handleVoiceMode}
                        />
                        <Toggle
                          label="Озвучивать английское слово"
                          hint={
                            voiceFlow
                              ? 'Всегда включена в голосовом режиме'
                              : 'Голос звучит, когда карточка появляется'
                          }
                          checked={settings.voiceEnglish}
                          disabled={!canSpeak || voiceFlow}
                          onChange={(checked) => updateSettings({ voiceEnglish: checked })}
                        />
                        <Toggle
                          label="Озвучивать перевод"
                          hint={
                            settings.showTranslation
                              ? 'Русский голос после английского'
                              : 'Сначала включите показ перевода (шаг 03)'
                          }
                          checked={settings.voiceTranslation}
                          disabled={!canSpeak || !settings.showTranslation}
                          onChange={(checked) => updateSettings({ voiceTranslation: checked })}
                        />
                      </div>
                      {canSpeak && (
                        <div className="mt-3 grid gap-2">
                          <label className="block">
                            <span className="mb-1.5 block text-xs font-medium text-stone-500">
                              Голос английского
                            </span>
                            <select
                              value={settings.voiceEnUri}
                              onChange={(event) => updateSettings({ voiceEnUri: event.target.value })}
                              aria-label="Голос английского"
                              className="field">
                              <option value="">Авто — лучший доступный</option>
                              {enVoices.map((voice) => (
                                <option key={voice.voiceURI} value={voice.voiceURI}>
                                  {voice.name} · {voice.localService ? 'на устройстве' : 'онлайн'}
                                </option>
                              ))}
                            </select>
                          </label>
                          <label className="block">
                            <span className="mb-1.5 block text-xs font-medium text-stone-500">
                              Голос русского
                            </span>
                            <select
                              value={settings.voiceRuUri}
                              onChange={(event) => updateSettings({ voiceRuUri: event.target.value })}
                              disabled={!settings.showTranslation}
                              aria-label="Голос русского"
                              className="field">
                              <option value="">Авто — лучший доступный</option>
                              {ruVoices.map((voice) => (
                                <option key={voice.voiceURI} value={voice.voiceURI}>
                                  {voice.name} · {voice.localService ? 'на устройстве' : 'онлайн'}
                                </option>
                              ))}
                            </select>
                          </label>
                          <p className="text-xs text-stone-400">
                            Авто выбирает самый живой: Google, Microsoft Natural или Apple. Не понравился —
                            выберите вручную.
                          </p>
                        </div>
                      )}
                    </fieldset>
                  </SettingsBlock>

                  {/* Итог: что получится */}
                  <div className="overflow-hidden rounded-3xl bg-[#16382d] p-4 text-white shadow-[0_18px_40px_-20px_rgba(8,56,33,0.7)] sm:p-5">
                    <p className="text-[10.5px] font-semibold uppercase tracking-[0.18em] text-[#86efac]">
                      Что получится
                    </p>
                    <p className="font-display mt-1 text-2xl leading-tight">
                      {canStart
                        ? voiceFlow
                          ? cardCountLabel(cardCount)
                          : `${cardCountLabel(cardCount)} · ≈ ${formatDuration(estimateMs)}`
                        : 'Пока нечего запускать'}
                    </p>
                    <ul className="mt-3 space-y-1.5 text-[13px] leading-relaxed text-white/70">
                      <li>→ {sourceLabel(settings)}</li>
                      <li>
                        →{' '}
                        {voiceFlow
                          ? 'ритм задаёт голос, таймеры выключены'
                          : settings.showTranslation
                            ? `карточка: ${settings.cardSeconds} с слово + ${settings.translationSeconds} с перевод`
                            : `карточка: ${settings.cardSeconds} с только слово`}
                      </li>
                      <li>
                        →{' '}
                        {settings.voiceEnglish || voiceFlow
                          ? 'английский звучит'
                          : 'английский без звука'}
                        {settings.showTranslation && settings.voiceTranslation ? ' + русский звучит' : ''}
                      </li>
                    </ul>
                    {!canStart && (
                      <p className="mt-3 rounded-2xl bg-white/10 px-3.5 py-2.5 text-xs leading-relaxed text-white/80">
                        {startHint}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="review-modal-foot">
              <button
                type="button"
                onClick={resetSettings}
                className="text-sm font-medium text-[#8b9aab] transition-colors hover:text-[#b42318]">
                Сбросить всё
              </button>
              <p className="tabular hidden text-xs text-[#8aa394] sm:block">
                {canStart ? `${cardCountLabel(cardCount)} · ${sourceLabel(settings).toLowerCase()}` : startHint}
              </p>
              <button type="button" onClick={closeSettings} className="btn-primary min-w-32">
                Готово
              </button>
            </div>
          </div>
        </div>
      )}

    </>
  )
}

export default ReviewPage
