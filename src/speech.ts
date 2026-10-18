// Озвучка через Web Speech API. Браузеры включают синтез только после жеста пользователя,
// поэтому первый вызов должен идти из обработчика клика (или сразу после него).
export const canSpeak = typeof window !== 'undefined' && 'speechSynthesis' in window

export type SpeechLang = 'en-US' | 'ru-RU'

interface VoicePattern {
  score: number
  match: RegExp
}

// Приоритеты английских голосов: сверху — самые живые.
// Google (Chrome), Microsoft Natural/Online, Apple — в топе;
// старые движки (Anna) и роботы (eSpeak) — в самом низу.
const EN_PATTERNS: VoicePattern[] = [
  { score: 100, match: /google us english/i },
  { score: 93, match: /google.+english/i },
  { score: 90, match: /\b(jenny|aria|emma|natasha|samantha|daniel|moira|karen|tessa|fiona)\b/i },
  { score: 86, match: /natural|online/i },
  { score: 70, match: /\b(zira|david|mark|alex|fred|victoria|thomas|kate|oliver|amelie|aaron|zoe)\b/i },
  { score: -60, match: /\banna\b/i },
  { score: -100, match: /espeak|e-speak|pico|festival|robot|cmu/i },
]

// Приоритеты русских голосов: Google, Microsoft Natural, Apple — в топе.
const RU_PATTERNS: VoicePattern[] = [
  { score: 100, match: /google.*русск/i },
  { score: 90, match: /svetlana|dmitry/i },
  { score: 86, match: /natural|online/i },
  { score: 84, match: /\bmilena\b|\byuri\b/i },
  { score: 70, match: /\birina\b|\bpavel\b/i },
  { score: -100, match: /espeak|e-speak|pico|festival|robot|cmu/i },
]

const patternsFor = (lang: SpeechLang): VoicePattern[] => (lang === 'ru-RU' ? RU_PATTERNS : EN_PATTERNS)

const isOffline = (): boolean => typeof navigator !== 'undefined' && navigator.onLine === false

// Оценка голоса: локальные чуть выше сетевых, offline — только локальные.
const scoreVoice = (voice: SpeechSynthesisVoice, lang: SpeechLang): number => {
  let score = voice.localService ? 60 : 55
  if (isOffline() && !voice.localService) score -= 60
  const label = `${voice.name} ${voice.lang}`
  for (const pattern of patternsFor(lang)) {
    if (pattern.match.test(label)) score += pattern.score
  }
  return score
}

const voicesOf = (lang: SpeechLang): SpeechSynthesisVoice[] => {
  const prefix = lang.slice(0, 2).toLowerCase()
  return window.speechSynthesis
    .getVoices()
    .filter((voice) => voice.lang.toLowerCase().startsWith(prefix))
}

// Все голоса языка от лучшего к худшему — для селекта в настройках.
export const rankVoices = (lang: SpeechLang): SpeechSynthesisVoice[] => {
  if (!canSpeak) return []
  return voicesOf(lang).sort((a, b) => scoreVoice(b, lang) - scoreVoice(a, lang))
}

// Ручной выбор из настроек (voiceURI). Не найден — откатываемся на авто.
const preferred: Record<SpeechLang, string | null> = { 'en-US': null, 'ru-RU': null }

export const setPreferredVoice = (lang: SpeechLang, voiceUri: string | null): void => {
  preferred[lang] = voiceUri && voiceUri.trim() !== '' ? voiceUri : null
}

const resolveVoice = (lang: SpeechLang): SpeechSynthesisVoice | undefined => {
  if (!canSpeak) return undefined
  const all = voicesOf(lang)
  if (all.length === 0) return undefined
  const wanted = preferred[lang]
  if (wanted) {
    const exact = all.find((voice) => voice.voiceURI === wanted)
    if (exact) return exact
  }
  return all.sort((a, b) => scoreVoice(b, lang) - scoreVoice(a, lang))[0]
}

// speak всегда отменяет предыдущую фразу: карточки не накладывают озвучку друг на друга.
// onEnd вызывается, когда фраза договорила. Отменённые фразы (cancel) его не вызывают,
// а прочие ошибки синтеза тоже двигают дальше — сессия никогда не замирает.
export const speak = (text: string, lang: SpeechLang = 'en-US', onEnd?: () => void): void => {
  if (!canSpeak) return
  const clean = text.trim()
  if (!clean) return
  const synth = window.speechSynthesis
  const utterance = new SpeechSynthesisUtterance(clean)
  utterance.lang = lang
  utterance.rate = lang === 'ru-RU' ? 1 : 0.95
  utterance.pitch = 1
  utterance.volume = 1
  const voice = resolveVoice(lang)
  if (voice) utterance.voice = voice
  if (onEnd) {
    utterance.onend = () => onEnd()
    utterance.onerror = (event) => {
      if (event.error === 'canceled' || event.error === 'interrupted') return
      onEnd()
    }
  }
  const play = (): void => {
    synth.resume()
    synth.speak(utterance)
    window.setTimeout(() => {
      if (synth.paused) synth.resume()
    }, 80)
  }
  if (synth.speaking || synth.pending) {
    synth.cancel()
    window.setTimeout(play, 60)
    return
  }
  play()
}

export const stopSpeech = (): void => {
  if (!canSpeak) return
  window.speechSynthesis.cancel()
}
