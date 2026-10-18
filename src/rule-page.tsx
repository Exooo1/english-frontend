import { useEffect, useRef, useState } from 'react'
import { ArrowLeft, ArrowRight, CircleCheck } from 'lucide-react'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import { unitById, unitsFor } from './curriculum'
import { RULES } from './rules'
import { RULE_ALIAS } from './rules/alias'
import { formulaFor } from './rules/explain'
import type { Rule, RuleBlock, RuleLevel } from './types'

// Уровни: порядок, название и цвета
const LEVELS: { id: RuleLevel; name: string; badge: string; dot: string; hero: string; cardHover: string }[] = [
  { id: 'A1', name: 'Начальный', badge: 'border-emerald-200 bg-emerald-50 text-emerald-700', dot: 'bg-emerald-500', hero: 'bg-[#14532d]', cardHover: 'hover:border-emerald-300' },
  { id: 'A2', name: 'Элементарный', badge: 'border-teal-200 bg-teal-50 text-teal-700', dot: 'bg-teal-500', hero: 'bg-[#134e4a]', cardHover: 'hover:border-teal-300' },
  { id: 'B1', name: 'Средний', badge: 'border-sky-200 bg-sky-50 text-sky-700', dot: 'bg-sky-500', hero: 'bg-[#1e3a8a]', cardHover: 'hover:border-sky-300' },
  { id: 'B2', name: 'Выше среднего', badge: 'border-violet-200 bg-violet-50 text-violet-700', dot: 'bg-violet-500', hero: 'bg-[#4c1d95]', cardHover: 'hover:border-violet-300' },
  { id: 'C1', name: 'Продвинутый', badge: 'border-amber-200 bg-amber-50 text-amber-700', dot: 'bg-amber-500', hero: 'bg-[#78350f]', cardHover: 'hover:border-amber-300' },
  { id: 'C2', name: 'Владение', badge: 'border-rose-200 bg-rose-50 text-rose-700', dot: 'bg-rose-500', hero: 'bg-[#881337]', cardHover: 'hover:border-rose-300' },
  { id: 'general', name: 'Общие', badge: 'border-[#d5e4db] bg-[#f4f7fb] text-stone-600', dot: 'bg-stone-400', hero: 'bg-[#16382d]', cardHover: 'hover:border-stone-300' },
]

const levelMeta = (level: RuleLevel) => LEVELS.find((l) => l.id === level) ?? LEVELS[LEVELS.length - 1]

const LAST_RULE = 'lf-last-rule'

// Уроки уровня идут по номеру блока, внутри блока — как в массиве правил
const orderedLevelRules = (level: RuleLevel): Rule[] => {
  const units = unitsFor(level)
  const known = new Set(units.map((unit) => unit.id))
  const group = RULES.filter((rule) => rule.level === level)
  const sequenced = units.flatMap((unit) => group.filter((rule) => rule.unit === unit.id))
  return [...sequenced, ...group.filter((rule) => !known.has(rule.unit))]
}

const canonicalLevel = (value: string | undefined): RuleLevel | null => {
  if (!value) return null
  return LEVELS.find((level) => level.id.toLowerCase() === value.toLowerCase())?.id ?? null
}

const headingAnchors = (blocks: RuleBlock[]): { id: string; text: string }[] => {
  const used = new Map<string, number>()
  const anchors: { id: string; text: string }[] = []
  for (const block of blocks) {
    if (block.type !== 'heading') continue
    const base = slugify(block.text) || 'section'
    const count = (used.get(base) ?? 0) + 1
    used.set(base, count)
    anchors.push({ id: count === 1 ? base : `${base}-${count}`, text: block.text })
  }
  return anchors
}

// Якорь для заголовков (кириллица сохраняется)
const slugify = (text: string): string =>
  text.toLowerCase().trim().replace(/[^a-zа-яё0-9]+/gi, '-').replace(/^-+|-+$/g, '')

// Русские plural-формы: 1 минута, 3 минуты, 5 минут
const plural = (n: number, one: string, few: string, many: string): string => {
  const m10 = n % 10
  const m100 = n % 100
  if (m10 === 1 && m100 !== 11) return one
  if (m10 >= 2 && m10 <= 4 && (m100 < 12 || m100 > 14)) return few
  return many
}

const countExamples = (rule: Rule): number =>
  rule.blocks.reduce(
    (sum, b) => sum + (b.type === 'examples' ? b.items.length : 0) + (b.type === 'split' ? b.items.length : 0),
    0
  )

const countMistakes = (rule: Rule): number =>
  rule.blocks.reduce((sum, b) => sum + (b.type === 'mistakes' ? b.items.length : 0), 0)

const readingMinutes = (rule: Rule): number =>
  Math.max(1, Math.round(JSON.stringify(rule.blocks).length / 1600))

const ruleMeta = (rule: Rule): string => {
  const mins = readingMinutes(rule)
  const ex = countExamples(rule)
  const mis = countMistakes(rule)
  const parts = [`≈ ${mins} ${plural(mins, 'минута', 'минуты', 'минут')} чтения`]
  if (ex > 0) parts.push(`${ex} ${plural(ex, 'пример', 'примера', 'примеров')}`)
  if (mis > 0) parts.push(`${mis} ${plural(mis, 'ошибка', 'ошибки', 'ошибок')}`)
  return parts.join(' · ')
}

// Латиница — serif, кириллица — sans: примеры сами выбирают начертание
const CellText = ({ text, strong }: { text: string; strong?: boolean }) => {
  const latin = /[A-Za-z]/.test(text) && !/[А-Яа-яЁё]/.test(text)
  return (
    <span className={`${latin ? 'font-display text-[15px] leading-snug' : ''} ${strong ? 'font-semibold text-stone-800' : 'text-stone-600'}`}>
      {text}
    </span>
  )
}

const CheckIcon = () => <CircleCheck size={20} className="shrink-0" aria-hidden="true" />

const toneOf = (number: number) => String(((number - 1) % 8) + 1)

// Гласные плитки алфавита подсвечиваем зелёным, Y — жёлтым
const VOWEL_TILE = new Set(['A', 'E', 'I', 'O', 'U'])

const SPY_LINE = 88

// Скроллится либо #main-scroll (десктоп, lg+), либо окно (мобильный).
// Слушаем оба, позиции меряем от верха вьюпорта — так работает в обоих режимах.
const scrollerOf = (): HTMLElement | null => {
  const root = document.getElementById('main-scroll')
  if (root && root.scrollHeight > root.clientHeight + 1) return root
  return null
}

const useActiveOnScroll = (key: string) => {
  const initial = key.length > 0 ? key.split('|')[0] : null
  const [active, setActive] = useState<string | null>(initial)
  const lock = useRef(false)
  const releaseRef = useRef<(() => void) | null>(null)
  const timers = useRef<number[]>([])

  const clearTimers = () => {
    for (const id of timers.current) window.clearTimeout(id)
    timers.current = []
  }

  useEffect(() => {
    const list = key.length > 0 ? key.split('|') : []
    setActive(list[0] ?? null)
    lock.current = false
    if (list.length === 0) return
    const nodes = list
      .map((id) => document.getElementById(id))
      .filter((node): node is HTMLElement => Boolean(node))
    if (nodes.length === 0) return

    const pick = () => {
      if (lock.current) return
      let current = nodes[0]
      for (const node of nodes) {
        if (node.getBoundingClientRect().top <= SPY_LINE) current = node
      }
      setActive(current.id)
    }

    pick()
    const root = document.getElementById('main-scroll')
    root?.addEventListener('scroll', pick, { passive: true })
    window.addEventListener('scroll', pick, { passive: true })
    return () => {
      root?.removeEventListener('scroll', pick)
      window.removeEventListener('scroll', pick)
      if (releaseRef.current) {
        root?.removeEventListener('scroll', releaseRef.current)
        window.removeEventListener('scroll', releaseRef.current)
      }
      releaseRef.current = null
      for (const id of timers.current) window.clearTimeout(id)
      timers.current = []
      lock.current = false
    }
  }, [key])

  const scrollTo = (id: string) => {
    const el = document.getElementById(id)
    if (!el) return
    const scroller = scrollerOf()
    const main = document.getElementById('main-scroll')
    if (releaseRef.current) {
      main?.removeEventListener('scroll', releaseRef.current)
      window.removeEventListener('scroll', releaseRef.current)
    }
    clearTimers()
    lock.current = true
    setActive(id)
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const behavior = reduce ? 'auto' : 'smooth'
    const top = scroller
      ? Math.max(0, el.getBoundingClientRect().top - scroller.getBoundingClientRect().top + scroller.scrollTop - 20)
      : Math.max(0, el.getBoundingClientRect().top + window.scrollY - SPY_LINE)
    const getPos = scroller ? () => scroller.scrollTop : () => window.scrollY
    const doScroll = scroller
      ? () => scroller.scrollTo({ top, behavior })
      : () => window.scrollTo({ top, behavior })
    doScroll()

    let timer = 0
    const release = () => {
      window.clearTimeout(timer)
      timer = window.setTimeout(() => {
        detach()
        lock.current = false
      }, 160)
    }
    const detach = () => {
      if (releaseRef.current === release) releaseRef.current = null
      if (scroller) scroller.removeEventListener('scroll', release)
      else window.removeEventListener('scroll', release)
    }
    releaseRef.current = release
    if (scroller) scroller.addEventListener('scroll', release, { passive: true })
    else window.addEventListener('scroll', release, { passive: true })
    const early = window.setTimeout(() => {
      if (Math.abs(getPos() - top) < 2) {
        detach()
        lock.current = false
      }
    }, 80)
    const safety = window.setTimeout(() => {
      detach()
      lock.current = false
    }, 2500)
    timers.current.push(early, safety)
  }

  return { active, scrollTo }
}

// Страница правил: витрина либо открытое правило
// Страницы с адресами: /rules → /rules/:level → /rules/:level/:ruleId
export const RulesLevelsPage = () => {
  const navigate = useNavigate()
  return <LevelsOverview onSelectLevel={(level) => navigate(`/rules/${level}`)} />
}

export const RulesLevelPage = () => {
  const { level } = useParams()
  const navigate = useNavigate()
  const canonical = canonicalLevel(level)
  if (!canonical) return <Navigate to="/rules" replace />
  if (level !== canonical) return <Navigate to={`/rules/${canonical}`} replace />
  return (
    <LevelView
      level={canonical}
      onBack={() => navigate('/rules')}
      onSelectRule={(id) => navigate(`/rules/${canonical}/${id}`)}
    />
  )
}

export const RuleArticlePage = () => {
  const { level, ruleId } = useParams()
  const navigate = useNavigate()
  const requested = ruleId ? RULE_ALIAS[ruleId] ?? ruleId : ruleId
  const rule = RULES.find((r) => r.id === requested)
  if (!rule) return <Navigate to="/rules" replace />
  if (ruleId !== rule.id || rule.level !== level) return <Navigate to={`/rules/${rule.level}/${rule.id}`} replace />
  return (
    <RuleArticle
      rule={rule}
      onBack={() => navigate(`/rules/${rule.level}`)}
      onHome={() => navigate('/rules')}
      onSelectRule={(id) => navigate(`/rules/${rule.level}/${id}`)}
    />
  )
}

// Описания уровней для витрины
const LEVEL_DESCRIPTIONS: Record<RuleLevel, string> = {
  A1: 'Первые шаги: звуки, чтение и базовые конструкции',
  A2: 'Бытовые темы и простое повседневное общение',
  B1: 'Уверенное общение на знакомые темы',
  B2: 'Свободное общение и аргументация',
  C1: 'Продвинутая грамматика и тонкости',
  C2: 'Владение языком в совершенстве',
  general: 'Разборы и шпаргалки вне уровней',
}

// Витрина: каждый уровень — один кликабельный блок
const LevelsOverview = ({ onSelectLevel }: { onSelectLevel: (level: RuleLevel) => void }) => (
  <section className="mx-auto max-w-6xl">
    <header className="mx-auto max-w-2xl text-center">
      <p className="eyebrow text-stone-400">Разбор грамматики</p>
      <h1 className="font-display mt-1.5 text-3xl leading-none text-[var(--tide)] sm:text-5xl">Правила</h1>
      <p className="mx-auto mt-2 max-w-xl text-[15px] text-stone-500">
        Выберите уровень — внутри темы и правила с примерами, таблицами и типичными ошибками.
      </p>
    </header>
    <div className="mx-auto mt-8 grid max-w-6xl gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {LEVELS.map((level, index) => {
        const group = RULES.filter((rule) => rule.level === level.id)
        const unitCount = unitsFor(level.id).length
        const code = level.id === 'general' ? '§' : level.id
        const name = level.id === 'general' ? 'Общие' : `${level.id} · ${level.name}`
        if (group.length === 0) {
          return (
            <div key={level.id} className="rounded-3xl border border-dashed border-[#d5e4db] bg-white/50 p-5 opacity-70 sm:p-7">
              <div className="flex items-start justify-between gap-3">
                <span className="font-display text-5xl leading-none text-stone-300 sm:text-6xl">{code}</span>
                <span className="rounded-full bg-[#e7eef5] px-2.5 py-1 text-xs text-stone-400">Скоро</span>
              </div>
              <p className="mt-4 text-lg font-semibold text-stone-500">{name}</p>
              <p className="mt-1 text-sm text-stone-400">{LEVEL_DESCRIPTIONS[level.id]}</p>
            </div>
          )
        }
        return (
          <button type="button"
            key={level.id}
            onClick={() => onSelectLevel(level.id)}
            style={{ animationDelay: `${Math.min(index * 70, 420)}ms` }}
            className={`anim-rise group rounded-3xl border border-[#d5e4db] bg-white p-5 text-left shadow-[0_1px_2px_rgba(16,24,40,0.05)] transition-[transform,box-shadow,border-color,background-color] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1.5 hover:shadow-[0_24px_48px_-20px_rgba(22,101,52,0.35)] active:translate-y-0 active:scale-[0.98] sm:p-7 ${level.cardHover}`}>
            <div className="flex items-start justify-between gap-3">
              <span className="font-display text-5xl leading-none transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.06] sm:text-6xl">{code}</span>
              <span className={`mt-1 h-3 w-3 rounded-full transition-transform duration-300 group-hover:scale-150 ${level.dot}`} />
            </div>
            <p className="mt-4 text-lg font-semibold">{name}</p>
            <p className="mt-1 text-sm text-stone-500">{LEVEL_DESCRIPTIONS[level.id]}</p>
            <p className="mt-4 flex items-center justify-between gap-3">
              <span className="text-[13px] text-stone-400">
                {unitCount} {plural(unitCount, 'блок', 'блока', 'блоков')}
                {' · '}
                {group.length} {plural(group.length, 'урок', 'урока', 'уроков')}
              </span>
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#e7eef5] text-stone-500 transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-1 group-hover:bg-[#16a34a] group-hover:text-white group-hover:shadow-[0_10px_20px_-8px_rgba(22,163,74,0.7)]">
                <ArrowRight size={18} aria-hidden="true" />
              </span>
            </p>
          </button>
        )
      })}
    </div>
  </section>
)

// Блок уровня: темы и правила внутри него
const LevelView = ({
  level,
  onBack,
  onSelectRule,
}: {
  level: RuleLevel
  onBack: () => void
  onSelectRule: (ruleId: string) => void
}) => {
  const meta = levelMeta(level)
  const group = orderedLevelRules(level)
  const units = unitsFor(level).filter((unit) => group.some((rule) => rule.unit === unit.id))
  const [lastId, setLastId] = useState<string | null>(null)
  const title = level === 'general' ? 'Общие правила' : `Уровень ${level} · ${meta.name}`
  const lastRule = group.find((rule) => rule.id === lastId) ?? null
  const empty = group.length === 0

  useEffect(() => {
    setLastId(localStorage.getItem(LAST_RULE))
  }, [])

  const unitKey = units.map((unit) => `unit-${unit.id}`).join('|')
  const { active: activeUnitId, scrollTo: scrollToUnit } = useActiveOnScroll(unitKey)

  return (
    <section className="level-page">
      <button type="button" className="level-back" onClick={onBack}>
        <span className="level-back-ico">
          <ArrowLeft size={16} aria-hidden="true" />
        </span>
        Все уровни
      </button>
      <header className="level-head">
        <h1 className="font-display text-3xl leading-tight text-[var(--tide)] sm:text-5xl">{title}</h1>
        <p className="level-lead">
          {empty
            ? `${LEVEL_DESCRIPTIONS[level]}. Уроки этого уровня появятся следующим блоком, в том же порядке.`
            : `${LEVEL_DESCRIPTIONS[level]}. Идите по номерам: блок за блоком, внутри блока урок за уроком.`}
        </p>
        {!empty && (
          <p className="level-count">
            {units.length} {plural(units.length, 'блок', 'блока', 'блоков')}
            {' · '}
            {group.length} {plural(group.length, 'урок', 'урока', 'уроков')}
          </p>
        )}
      </header>
      {lastRule && (
        <button type="button" className="resume" onClick={() => onSelectRule(lastRule.id)}>
          <span className="resume-kicker">Продолжить</span>
          <span className="resume-title">{lastRule.title}</span>
          <span className="resume-meta">{unitById(lastRule.unit)?.title}</span>
          <span className="resume-go">
            <ArrowRight size={16} aria-hidden="true" />
          </span>
        </button>
      )}
      {empty && (
        <p className="mt-8 rounded-3xl border border-dashed border-[#d5e4db] bg-white/70 px-6 py-10 text-center text-sm text-stone-500">
          Пока здесь пусто. Уроки появятся нумерованными блоками, как на A1.
        </p>
      )}
      <div className="level-layout">
        <div className="min-w-0">
          <ol className="path">
            {units.map((unit, unitIndex) => {
              const lessons = group.filter((rule) => rule.unit === unit.id)
              return (
                <li key={unit.id} id={`unit-${unit.id}`} style={{ animationDelay: `${Math.min(unitIndex * 60, 360)}ms` }} className="anim-rise path-unit" data-tone={toneOf(unit.number)}>
                  <div className="path-index" aria-hidden="true">{String(unit.number).padStart(2, '0')}</div>
                  <div className="min-w-0">
                    <h2 className="font-display text-xl leading-tight sm:text-2xl">{unit.title}</h2>
                    <p className="mt-1 text-sm text-stone-500">{unit.summary}</p>
                    <ol className="path-lessons">
                      {lessons.map((rule, index) => (
                        <li key={rule.id}>
                          <button type="button" className="path-lesson" onClick={() => onSelectRule(rule.id)}>
                            <span className="path-n">{index + 1}</span>
                            <span className="min-w-0">
                              <span className="path-lesson-title">{rule.title}</span>
                              <span className="path-lesson-sub">{rule.subtitle}</span>
                            </span>
                            <ArrowRight size={16} aria-hidden="true" className="path-arrow" />
                          </button>
                        </li>
                      ))}
                    </ol>
                  </div>
                </li>
              )
            })}
          </ol>
        </div>
        {units.length > 0 && (
          <nav className="unit-rail" aria-label="Блоки уровня">
            <p className="unit-rail-kicker">Блоки</p>
            <ol>
              {units.map((unit) => (
                <li key={unit.id}>
                  <a
                    href={`#unit-${unit.id}`}
                    data-tone={toneOf(unit.number)}
                    className={activeUnitId === `unit-${unit.id}` ? 'is-on' : undefined}
                    onClick={(event) => {
                      event.preventDefault()
                      scrollToUnit(`unit-${unit.id}`)
                    }}>
                    <span className="unit-rail-n">{String(unit.number).padStart(2, '0')}</span>
                    <span className="unit-rail-name">{unit.title}</span>
                  </a>
                </li>
              ))}
            </ol>
          </nav>
        )}
      </div>
    </section>
  )
}

// Открытое правило: тёмный hero, содержание, текст + переход к соседним
const RuleArticle = ({ rule, onBack, onHome, onSelectRule }: { rule: Rule; onBack: () => void; onHome: () => void; onSelectRule: (ruleId: string) => void }) => {
  const headings = headingAnchors(rule.blocks)
  const { active: activeHeading, scrollTo: scrollToHeading } = useActiveOnScroll(headings.map((heading) => heading.id).join('|'))

  const siblings = orderedLevelRules(rule.level)
  const siblingIndex = siblings.findIndex((r) => r.id === rule.id)
  const prevRule = siblingIndex > 0 ? siblings[siblingIndex - 1] : null
  const nextRule = siblingIndex >= 0 && siblingIndex < siblings.length - 1 ? siblings[siblingIndex + 1] : null
  const levelName = rule.level === 'general' ? 'Общие' : `Уровень ${rule.level}`
  const unit = unitById(rule.unit)
  const inUnit = siblings.filter((item) => item.unit === rule.unit)
  const indexInUnit = inUnit.findIndex((item) => item.id === rule.id)

  const meta = levelMeta(rule.level)
  const notes = rule.blocks.filter((block) => block.type === 'callout')
  const flow = rule.blocks.filter((block) => block.type !== 'callout')
  const lessonNo = indexInUnit >= 0 ? String(indexInUnit + 1).padStart(2, '0') : ''

  useEffect(() => {
    localStorage.setItem(LAST_RULE, rule.id)
  }, [rule.id])

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      const target = event.target
      if (target instanceof HTMLElement && target.closest('input, textarea, select, [contenteditable="true"]')) return
      if (event.key === 'ArrowLeft' && prevRule) onSelectRule(prevRule.id)
      if (event.key === 'ArrowRight' && nextRule) onSelectRule(nextRule.id)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [prevRule, nextRule, onSelectRule])

  return (
    <article className="rule-read">
      <div className="rule-sheet">
      <div className="rule-lead">
      <nav aria-label="Хлебные крошки" className="crumb">
        <button type="button" onClick={onHome}>Правила</button>
        <span aria-hidden="true">/</span>
        <button type="button" onClick={onBack}>{levelName}</button>
        <span aria-hidden="true">/</span>
        <span aria-current="page">{rule.title}</span>
      </nav>

      <header className={`rule-hero ${meta.hero}`}>
        {lessonNo && <span className="rule-hero-num" aria-hidden="true">{lessonNo}</span>}
        <p className="rule-hero-kicker">
          {unit ? unit.title : levelName}
          {inUnit.length > 0 && indexInUnit >= 0 ? ` · ${indexInUnit + 1} из ${inUnit.length}` : ''}
        </p>
        <h1 className="font-display rule-hero-title">{rule.title}</h1>
        <p className="rule-hero-sub">{rule.subtitle}</p>
        <p className="rule-hero-meta">
          {siblingIndex >= 0 ? `Шаг ${siblingIndex + 1} из ${siblings.length} · ` : ''}
          {ruleMeta(rule)}
        </p>
      </header>
      </div>

      {headings.length > 1 && (
        <nav aria-label="Содержание" className="rule-rail">
          <p className="rule-rail-kicker">На странице</p>
          <ol>
            {headings.map((heading) => {
              const isActive = heading.id === activeHeading
              return (
                <li key={heading.id}>
                  <a
                    href={`#${heading.id}`}
                    aria-current={isActive ? 'location' : undefined}
                    onClick={(event) => {
                      event.preventDefault()
                      scrollToHeading(heading.id)
                    }}
                    className={isActive ? 'is-on' : undefined}>
                    {heading.text}
                  </a>
                </li>
              )
            })}
          </ol>
        </nav>
      )}

      <div className={notes.length > 0 ? 'rule-body has-note' : 'rule-body'}>
        {notes.length > 0 && (
          <aside className="remember-col">
            {notes.map((block, index) =>
              block.type === 'callout' ? (
                <div key={`${block.title}-${index}`} className="remember">
                  <p className="remember-kicker">{block.title}</p>
                  <p className="remember-text">{block.text}</p>
                </div>
              ) : null
            )}
          </aside>
        )}
        <div className="min-w-0">
          {rule.blocks.some((block) => block.type === 'forms') ? null : <FormulaCard ruleId={rule.id} />}
          {(() => {
            let headingCursor = 0
            return flow.map((block, index) => {
              const next = flow[index + 1]
              if (block.type === 'heading' && next?.type === 'mistakes' && /ошибк/i.test(block.text)) return null
              const prev = flow[index - 1]
              const takesHeading =
                block.type === 'heading' ||
                (block.type === 'mistakes' && prev?.type === 'heading' && /ошибк/i.test(prev.text))
              return (
                <RuleBlockView
                  key={`${rule.id}-${index}`}
                  block={block}
                  headingId={takesHeading ? headings[headingCursor++]?.id : undefined}
                />
              )
            })
          })()}
        </div>
      </div>
      </div>

      {prevRule && (
        <button type="button" className="lesson-nav lesson-nav-prev" onClick={() => onSelectRule(prevRule.id)} aria-label={`Назад: ${prevRule.title}`}>
          <span className="lesson-nav-ico">
            <ArrowLeft size={18} aria-hidden="true" />
          </span>
          <span className="lesson-nav-copy">
            <span className="lesson-nav-kicker">Назад</span>
            <span className="lesson-nav-title">{prevRule.title}</span>
          </span>
        </button>
      )}
      {nextRule && (
        <button type="button" className="lesson-nav lesson-nav-next" onClick={() => onSelectRule(nextRule.id)} aria-label={`Дальше: ${nextRule.title}`}>
          <span className="lesson-nav-ico">
            <ArrowRight size={18} aria-hidden="true" />
          </span>
          <span className="lesson-nav-copy">
            <span className="lesson-nav-kicker">Дальше</span>
            <span className="lesson-nav-title">{nextRule.title}</span>
          </span>
        </button>
      )}
    </article>
  )
}

const FormulaCard = ({ ruleId }: { ruleId: string }) => {
  const formula = formulaFor(ruleId)
  return (
    <section className="rule-formula" aria-label="Правило">
      <p className="rule-formula-kicker">Правило</p>
      {formula.text.split('\n').map((line, index) => {
        const text = line.trim().replace(/-(?=\w)/g, '\u2011')
        if (!text) return <div key={index} className="rule-formula-gap" />
        return (
          <p key={index} className="rule-formula-text">
            {text}
          </p>
        )
      })}
    </section>
  )
}

const RuleBlockView = ({ block, headingId }: { block: RuleBlock; headingId?: string }) => {
  switch (block.type) {
    case 'lead':
      return <p className="text-lg leading-relaxed text-stone-600">{block.text}</p>
    case 'heading':
      return (
        <h2 id={headingId} className="font-display mt-10 scroll-mt-28 text-2xl leading-snug sm:text-3xl lg:scroll-mt-8">
          {block.text}
        </h2>
      )
    case 'text':
      return <p className="mt-4 text-[15px] leading-relaxed text-stone-600">{block.text}</p>
    case 'split':
      return (
        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          {block.items.map((item) => (
            <div key={item.title} className="rounded-2xl border border-[#d5e4db] bg-white p-6 shadow-[0_1px_2px_rgba(16,24,40,0.04)]">
              <div className="flex items-baseline justify-between gap-2">
                <p className="font-display text-4xl">{item.title}</p>
                <span className="rounded-md bg-[#e8f5ee] px-2 py-1 text-xs font-medium text-[#16a34a]">{item.caption}</span>
              </div>
              <p className="font-display mt-4 text-xl italic leading-relaxed text-stone-800">“{item.example}”</p>
              <p className="mt-1.5 text-sm text-stone-500">{item.translation}</p>
            </div>
          ))}
        </div>
      )
    case 'table':
      return (
        <div className="mt-6 overflow-x-auto rounded-2xl border border-[#d5e4db] bg-white shadow-[0_1px_2px_rgba(16,24,40,0.04)]">
          <table className="w-full min-w-[520px] border-collapse text-left sm:min-w-[560px]">
            <thead>
              <tr className="border-b border-[#d5e4db] bg-[#f4f7fb]">
                {block.head.map((cell, index) => (
                  <th
                    key={index}
                    scope="col"
                    className="px-3 py-3 text-[11px] font-semibold uppercase tracking-wider text-stone-400 sm:px-5">
                    {cell}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {block.rows.map((row, rowIndex) => (
                <tr key={rowIndex} className="align-top transition-colors last:border-b-0 hover:bg-stone-50/70">
                  {row.map((cell, cellIndex) => (
                    <td key={cellIndex} className="px-3 py-3 text-sm sm:px-5 sm:py-3.5">
                      <CellText text={cell} strong={cellIndex === 0} />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )
    case 'tiles':
      return (
        <div className="mt-6 grid grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-2.5 lg:grid-cols-4 xl:grid-cols-6">
          {block.items.map((item) => {
            const match = /^([A-Za-z]) ([a-z])$/.exec(item.title)
            const letter = match ? match[1].toUpperCase() : null
            const isVowel = letter ? VOWEL_TILE.has(letter) : false
            const isY = letter === 'Y'
            return (
            <div
              key={item.title}
              className={`flex min-h-[132px] flex-col items-center justify-center rounded-2xl border px-3 py-4 text-center shadow-[0_1px_2px_rgba(16,24,40,0.04)] transition-[transform,box-shadow,border-color,background-color] duration-200 hover:-translate-y-0.5 hover:shadow-md ${isVowel ? 'border-emerald-300 bg-emerald-50/60 hover:border-emerald-400' : isY ? 'border-amber-300 bg-amber-50/60 hover:border-amber-400' : 'border-[#d5e4db] bg-white hover:border-[#16a34a]/30'}`}>
              <p className="font-display text-4xl leading-none">{item.title}</p>
              <p className={`mt-2 rounded-md px-2 py-0.5 text-xs font-medium ${isY ? 'bg-amber-100 text-amber-700' : 'bg-[#e8f5ee] text-[#16a34a]'}`}>{item.caption}</p>
              <p className="mt-1.5 text-xs leading-snug text-stone-500">{item.text}</p>
            </div>
            )
          })}
        </div>
      )
    case 'practice':
    case 'checklist':
      return null
    case 'forms':
      return (
        <div className="forms">
          {block.items.map((item) => (
            <section key={item.title}>
              <p className="forms-title">{item.title}</p>
              <p className="forms-en">{item.en}</p>
              <p className="forms-ru">{item.ru}</p>
              <p className="forms-formula">{item.formula}</p>
            </section>
          ))}
        </div>
      )
    case 'schemes':
      return (
        <ul className="schemes">
          {block.items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      )
    case 'examples':
      return (
        <ol className="examples">
          {block.items.map((item, index) => (
            <li key={`${item.en}-${index}`}>
              <span className="ex-index">{String(index + 1).padStart(2, '0')}</span>
              <div className="min-w-0">
                <p className="ex-en">{item.en}</p>
                <p className="ex-ru">{item.ru}</p>
                {item.context ? <p className="ex-ctx">{item.context}</p> : null}
              </div>
            </li>
          ))}
        </ol>
      )
    case 'mistakes':
      return (
        <section className="fixes" aria-label="Типичные ошибки" id={headingId}>
          <h2 className="fixes-title">Типичные ошибки</h2>
          <ol>
            {block.items.map((item, index) => (
              <li key={`${item.wrong}-${index}`}>
                <p className="fix-wrong">{item.wrong}</p>
                <p className="fix-right">{item.right}</p>
                <p className="fix-why">{item.note}</p>
              </li>
            ))}
          </ol>
        </section>
      )
    case 'callout':
      return (
        <div className="mt-8 flex gap-3.5 rounded-2xl border border-[#16a34a]/15 bg-[#e8f5ee] p-5 sm:p-6">
          <span className="text-[#16a34a]">
            <CheckIcon />
          </span>
          <div>
            <p className="text-sm font-semibold text-[#16a34a]">{block.title}</p>
            <p className="mt-1 text-[15px] leading-relaxed text-stone-700">{block.text}</p>
          </div>
        </div>
      )
    default:
      return null
  }
}
