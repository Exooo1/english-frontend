import { memo, useEffect, useState } from 'react'
import { BookOpen, ChevronLeft, GraduationCap, Repeat } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { BrowserRouter, Link, NavLink, Navigate, Route, Routes, useLocation } from 'react-router-dom'
import { useEntries } from './api'
import ReviewPage from './review-page'
import { RuleArticlePage, RulesLevelPage, RulesLevelsPage } from './rule-page'
import { RULES } from './rules'
import VocabularyPage from './vocabulary-page'

interface NavCounts {
  vocabulary: number
  rules: number
  review: number
}

const NAV: { to: string; label: string; icon: LucideIcon; countKey: keyof NavCounts }[] = [
  { to: '/vocabulary', label: 'Словарь', icon: BookOpen, countKey: 'vocabulary' },
  { to: '/review', label: 'Повторение', icon: Repeat, countKey: 'review' },
  { to: '/rules', label: 'Правила', icon: GraduationCap, countKey: 'rules' },
]

const ScrollToTop = () => {
  const { pathname } = useLocation()
  useEffect(() => {
    document.getElementById('main-scroll')?.scrollTo({ top: 0 })
    window.scrollTo(0, 0)
  }, [pathname])
  return null
}

const NotFoundPage = () => (
  <section className="mx-auto flex max-w-xl flex-1 flex-col items-center justify-center px-6 py-20 text-center">
    <span className="font-display text-7xl text-[#c5d2df]">404</span>
    <h1 className="font-display mt-4 text-3xl text-[var(--tide)]">Такой страницы нет</h1>
    <p className="mt-2 text-sm text-[#5d6e82]">Проверьте адрес или вернитесь к словарю.</p>
    <NavLink to="/vocabulary" className="btn-primary mt-6">
      К словарю
    </NavLink>
  </section>
)

const Sidebar = memo(function Sidebar({
  vocabulary,
  rules,
  review,
  open,
  onToggle,
}: NavCounts & { open: boolean; onToggle: () => void }) {
  const counts: NavCounts = { vocabulary, rules, review }

  return (
    <aside className={open ? 'spine is-open' : 'spine'}>
      <div className="spine-body">
      <div className="spine-brand">
        <Link to="/vocabulary" className="spine-brand-link" aria-label="LinguaFlow — к словарю">
          <span className="spine-ico mark">en</span>
          <span className="spine-rest">
            <span className="spine-clip">
              <span className="spine-name">LinguaFlow</span>
              <span className="spine-kicker">английский</span>
            </span>
          </span>
        </Link>
      </div>

      <nav className="spine-nav" aria-label="Разделы">
        {NAV.map((item) => {
          const Icon = item.icon
          return (
            <NavLink key={item.to} to={item.to} className="spine-link" title={item.label}>
              <span className="spine-ico">
                <Icon strokeWidth={1.75} aria-hidden="true" />
              </span>
              <span className="spine-rest">
                <span className="spine-clip">
                  <span className="spine-label">{item.label}</span>
                  <span className="spine-count tabular">{counts[item.countKey]}</span>
                </span>
              </span>
            </NavLink>
          )
        })}
      </nav>
      </div>
      <button
        type="button"
        className="spine-edge"
        aria-expanded={open}
        aria-label={open ? 'Свернуть меню' : 'Развернуть меню'}
        onClick={onToggle}>
        <ChevronLeft strokeWidth={1.75} aria-hidden="true" />
      </button>
    </aside>
  )
})

const Shell = () => {
  const wordsApi = useEntries('words')
  const expressionsApi = useEntries('expressions')
  const { pathname } = useLocation()
  const isRules = pathname === '/rules' || pathname.startsWith('/rules/')
  const [spineOpen, setSpineOpen] = useState(true)

  return (
    <div className="app-shell flex min-h-dvh" data-spine={spineOpen ? 'open' : 'shut'}>
      <ScrollToTop />
      <Sidebar
        vocabulary={wordsApi.entries.length + expressionsApi.entries.length}
        rules={RULES.length}
        review={wordsApi.entries.length + expressionsApi.entries.length}
        open={spineOpen}
        onToggle={() => setSpineOpen((value) => !value)}
      />

      <div className="flex min-w-0 flex-1 flex-col lg:h-dvh lg:overflow-hidden">
        <header className="mobile-bar lg:hidden">
          <Link to="/vocabulary" className="mobile-brand" aria-label="LinguaFlow — к словарю">
            <span className="mark">en</span>
            <span>
              <span className="mobile-name">LinguaFlow</span>
              <span className="mobile-kicker">английский</span>
            </span>
          </Link>
          <nav className="mobile-nav" aria-label="Разделы">
            {NAV.map((item) => (
              <NavLink key={item.to} to={item.to}>
                {item.label}
              </NavLink>
            ))}
          </nav>
        </header>

        <nav className="phone-tabs" aria-label="Разделы">
          {NAV.map((item) => {
            const Icon = item.icon
            return (
              <NavLink key={item.to} to={item.to} className="phone-tab">
                <Icon strokeWidth={1.75} aria-hidden="true" />
                {item.label}
              </NavLink>
            )
          })}
        </nav>

        <main
          id="main-scroll"
          className={`flex min-h-0 w-full flex-1 flex-col px-4 py-5 sm:px-6 sm:py-8 md:px-8 xl:px-10 ${
            isRules ? 'lg:overflow-y-auto lg:py-8' : 'lg:overflow-hidden lg:py-6'
          }`}>
          <Routes>
            <Route path="/" element={<Navigate to="/vocabulary" replace />} />
            <Route
              path="/vocabulary"
              element={<VocabularyPage words={wordsApi} expressions={expressionsApi} />}
            />
            <Route path="/words" element={<Navigate to="/vocabulary?tab=words" replace />} />
            <Route path="/expressions" element={<Navigate to="/vocabulary?tab=expressions" replace />} />
            <Route
              path="/review"
              element={
                <ReviewPage
                  words={wordsApi.entries}
                  expressions={expressionsApi.entries}
                  wordsStatus={wordsApi.status}
                  expressionsStatus={expressionsApi.status}
                />
              }
            />
            <Route path="/rules" element={<RulesLevelsPage />} />
            <Route path="/rules/:level" element={<RulesLevelPage />} />
            <Route path="/rules/:level/:ruleId" element={<RuleArticlePage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>
      </div>
    </div>
  )
}

const App = () => (
  <BrowserRouter>
    <Shell />
  </BrowserRouter>
)

export default App
