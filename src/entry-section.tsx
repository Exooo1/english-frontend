import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import {
  ChevronLeft as ChevronLeftLucide,
  ChevronRight as ChevronRightLucide,
  ChevronsLeft as ChevronsLeftLucide,
  ChevronsRight as ChevronsRightLucide,
  CircleAlert,
  CircleCheck,
  Pencil,
  Plus,
  Search,
  Star,
  Trash2,
  Volume2,
  X,
} from 'lucide-react'
import { createEntry, deleteEntry, toggleFavorite, updateEntry } from './api'
import type { EntriesStatus, EntryKind, EntryPayload } from './api'
import { canSpeak, speak } from './speech'
import type { Entry } from './types'

const PAGE_SIZE = 20

const btnPrimary = 'btn-primary'
const iconBtn =
  'flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-[#8b9aab] transition-colors hover:bg-[#e8f5ee] hover:text-[#16a34a]'

const SearchIcon = () => <Search size={16} aria-hidden="true" />

const PlusIcon = () => <Plus size={16} aria-hidden="true" />

const ChevronLeft = () => <ChevronLeftLucide size={16} aria-hidden="true" />

const ChevronRight = () => <ChevronRightLucide size={16} aria-hidden="true" />

const EditIcon = () => <Pencil size={16} aria-hidden="true" />

const TrashIcon = () => <Trash2 size={16} aria-hidden="true" />

const ToastErrorIcon = () => <CircleAlert size={16} aria-hidden="true" />

const ToastSuccessIcon = () => <CircleCheck size={16} aria-hidden="true" />

// Дата и время в формате «14 сент. 2026, 21:22»
const formatDate = (value: string): string => {
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return '—'
  return new Intl.DateTimeFormat('ru-RU', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(date)
}

const ChevronsLeft = () => <ChevronsLeftLucide size={16} aria-hidden="true" />

const ChevronsRight = () => <ChevronsRightLucide size={16} aria-hidden="true" />

const SoundIcon = () => <Volume2 size={15} aria-hidden="true" />

const StarIcon = ({ filled }: { filled: boolean }) => (
  <Star size={16} aria-hidden="true" fill={filled ? 'currentColor' : 'none'} />
)

const CloseIcon = ({ size = 14 }: { size?: number }) => <X size={size} aria-hidden="true" />

// Русские plural-формы: 1 слово, 3 слова, 8 слов
const plural = (n: number, one: string, few: string, many: string): string => {
  const m10 = n % 10
  const m100 = n % 100
  if (m10 === 1 && m100 !== 11) return one
  if (m10 >= 2 && m10 <= 4 && (m100 < 12 || m100 > 14)) return few
  return many
}

interface PaginationProps {
  page: number
  pageCount: number
  total: number
  onPageChange: (page: number) => void
  query: string
  favoritesActive: boolean
}

// Пагинация с фиксированной шириной: всегда 7 номеров + 2 слота под «…»,
// пустые слоты держат место невидимкой — кнопки не прыгают при переключении
const Pagination = ({ page, pageCount, total, onPageChange, query, favoritesActive }: PaginationProps) => {
  if (total === 0) return null
  const from = (page - 1) * PAGE_SIZE + 1
  const to = Math.min(page * PAGE_SIZE, total)

  const small = pageCount <= 7
  const start = small ? 2 : Math.min(Math.max(page - 2, 2), pageCount - 5)
  const middle: number[] = small
    ? Array.from({ length: pageCount - 2 }, (_, i) => i + 2)
    : [start, start + 1, start + 2, start + 3, start + 4]
  const showLeftGap = !small && start > 2
  const showRightGap = !small && start + 4 < pageCount - 1

  const pageButton = (item: number) => (
    <button
      key={item}
      type="button"
      onClick={() => onPageChange(item)}
      aria-current={item === page ? 'page' : undefined}
      aria-label={`Страница ${item}`}
      className={item === page ? 'pager-page is-on' : 'pager-page'}>
      {item}
    </button>
  )
  const gap = (visible: boolean, side: string) => (
    <span key={`gap-${side}`} className="pager-gap" aria-hidden="true">
      <span className={visible ? '' : 'invisible'}>…</span>
    </span>
  )

  const showQuery = query !== '' || favoritesActive

  return (
    <div className="pager">
      <span className="pager-side" aria-live="polite">
        {showQuery && (
          <span className="pager-query" title={query !== '' ? `Поиск: ${query}` : 'Избранное'}>
            {favoritesActive && <span className="pager-star" aria-hidden="true">★</span>}
            {query !== '' && (
              <>
                <b>«{query}»</b>
                {' · '}
              </>
            )}
            <span className="tabular">{total}</span>{' '}
            {plural(total, 'запись', 'записи', 'записей')}
          </span>
        )}
      </span>
      <nav className="pager-nav" aria-label="Разбивка на страницы">
        <button type="button" onClick={() => onPageChange(1)} disabled={page <= 1} aria-label="Первая страница" title="Первая страница" className="pager-arrow">
          <ChevronsLeft />
        </button>
        <button type="button" onClick={() => onPageChange(page - 1)} disabled={page <= 1} aria-label="Предыдущая страница" className="pager-arrow">
          <ChevronLeft />
        </button>
        <span className="tabular min-w-12 px-1 text-center text-sm font-medium text-[#3e5649] sm:hidden">
          {page}/{pageCount}
        </span>
        <span className="hidden items-center gap-1.5 sm:contents">
          {pageButton(1)}
          {small ? null : gap(showLeftGap, 'left')}
          {middle.map(pageButton)}
          {small ? null : gap(showRightGap, 'right')}
          {pageCount > 1 ? pageButton(pageCount) : null}
        </span>
        <button type="button" onClick={() => onPageChange(page + 1)} disabled={page >= pageCount} aria-label="Следующая страница" className="pager-arrow">
          <ChevronRight />
        </button>
        <button type="button" onClick={() => onPageChange(pageCount)} disabled={page >= pageCount} aria-label="Последняя страница" title="Последняя страница" className="pager-arrow">
          <ChevronsRight />
        </button>
      </nav>
      <p className="pager-range pager-range-right">
        <span className="pager-span tabular">{from}–{to}</span>
        <span className="pager-of">из {total}</span>
      </p>
    </div>
  )
}

interface Toast {
  id: number
  type: 'error' | 'success'
  title: string
  message: string
}

export interface EntryLabels {
  eyebrow: string
  title: string
  single: string
  newItem: string
  editItem: string
  itemAcc: string
  itemGen: string
  englishPlaceholder: string
  meaningPlaceholder: string
  searchPlaceholder: string
  emptyTitle: string
  emptyAddHint: string
}

interface EntrySectionProps {
  kind: EntryKind
  entries: Entry[]
  refresh: () => Promise<boolean>
  status: EntriesStatus
  labels: EntryLabels
  // Компактный режим внутри «Словаря»: заголовок рисует страница-родитель
  bare?: boolean
  // Только избранное: фильтр включён всегда, кнопка добавления скрыта
  lockFavorites?: boolean
}

// Секция записей (слова или выражения): таблица на весь экран, пагинация всегда видна
const EntrySection = ({ kind, entries, refresh, status, labels, bare = false, lockFavorites = false }: EntrySectionProps) => {
  const [search, setSearch] = useState<string>('')
  const [page, setPage] = useState<number>(1)

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const [editingId, setEditingId] = useState<number | null>(null)
  const [formEnglish, setFormEnglish] = useState<string>('')
  const [formTranslation, setFormTranslation] = useState<string>('')
  const [formExample, setFormExample] = useState<string>('')
  const [formMeaning, setFormMeaning] = useState<string>('')

  const [toasts, setToasts] = useState<Toast[]>([])
  const [meaningEntry, setMeaningEntry] = useState<Entry | null>(null)
  const [saving, setSaving] = useState(false)
  const scrollRef = useRef<HTMLDivElement | null>(null)
  const toastTimers = useRef<Map<number, number>>(new Map())
  const deletingIds = useRef<Set<number>>(new Set())

  // При смене страницы или поиска — всегда к началу списка
  useEffect(() => {
    scrollRef.current?.scrollTo({ top: 0 })
    document.getElementById('main-scroll')?.scrollTo({ top: 0 })
    window.scrollTo(0, 0)
  }, [page, search])

  useEffect(
    () => () => {
      toastTimers.current.forEach((timer) => window.clearTimeout(timer))
    },
    []
  )

  const pushToast = (type: Toast['type'], title: string, message: string) => {
    const id = Date.now() + Math.random()
    setToasts((prev) => [...prev.slice(-2), { id, type, title, message }])
    const timer = window.setTimeout(() => {
      toastTimers.current.delete(id)
      setToasts((prev) => prev.filter((t) => t.id !== id))
    }, 4500)
    toastTimers.current.set(id, timer)
  }

  const dismissToast = (id: number) => {
    const timer = toastTimers.current.get(id)
    if (timer) window.clearTimeout(timer)
    toastTimers.current.delete(id)
    setToasts((prev) => prev.filter((t) => t.id !== id))
  }

  const closeForm = useCallback(() => {
    setIsModalOpen(false)
    setEditingId(null)
    setFormEnglish('')
    setFormTranslation('')
    setFormExample('')
    setFormMeaning('')
  }, [])

  // Escape закрывает верхнее окно. На телефоне overflow:hidden не держит страницу — фиксируем body.
  const isOverlayOpen = isModalOpen || meaningEntry !== null
  useEffect(() => {
    if (!canSpeak) return
    window.speechSynthesis.getVoices()
    const prime = () => window.speechSynthesis.getVoices()
    window.speechSynthesis.addEventListener('voiceschanged', prime)
    return () => window.speechSynthesis.removeEventListener('voiceschanged', prime)
  }, [])

  useEffect(() => {
    if (!isOverlayOpen) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return
      if (meaningEntry) setMeaningEntry(null)
      else closeForm()
    }
    document.addEventListener('keydown', onKey)
    const html = document.documentElement
    const main = document.getElementById('main-scroll')
    const scrollY = window.scrollY
    const mainTop = main?.scrollTop ?? 0
    const prevMain = main?.style.overflow ?? ''
    html.classList.add('scroll-lock')
    document.body.style.top = `-${scrollY}px`
    if (main) main.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      html.classList.remove('scroll-lock')
      document.body.style.top = ''
      if (main) main.style.overflow = prevMain
      window.scrollTo(0, scrollY)
      if (main) main.scrollTop = mainTop
    }
  }, [isOverlayOpen, meaningEntry, closeForm])

  const filtered = useMemo(() => {
    const scoped = lockFavorites ? entries.filter((e) => e.isFavorite) : entries
    const query = search.trim().toLowerCase()
    if (!query) return scoped
    return scoped.filter(
      (e) =>
        e.english.toLowerCase().includes(query) ||
        e.translation.toLowerCase().includes(query) ||
        e.example.toLowerCase().includes(query) ||
        e.meaning.toLowerCase().includes(query)
    )
  }, [entries, search, lockFavorites])

  const pageCount = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE))
  const safePage = Math.min(page, pageCount)
  const paged = filtered.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE)

  useEffect(() => {
    if (page > pageCount) setPage(pageCount)
  }, [page, pageCount])

  const openCreateModal = () => {
    setEditingId(null)
    setFormEnglish('')
    setFormTranslation('')
    setFormExample('')
    setFormMeaning('')
    setIsModalOpen(true)
  }

  const openEditModal = (id: number) => {
    const entry = entries.find((e) => e.id === id)
    if (!entry) return
    setEditingId(id)
    setFormEnglish(entry.english)
    setFormTranslation(entry.translation)
    setFormExample(entry.example)
    setFormMeaning(entry.meaning)
    setIsModalOpen(true)
  }

  const handleToggleFavorite = async (entry: Entry) => {
    const ok = await toggleFavorite(kind, entry)
    if (!ok) {
      pushToast('error', 'Не удалось обновить избранное', 'Сервер недоступен. Попробуйте позже.')
      return
    }
    await refresh()
  }

  const handleSubmit = async () => {
    if (saving) return
    const editing = editingId === null ? null : entries.find((e) => e.id === editingId) ?? null
    const payload: EntryPayload = {
      english: formEnglish.trim(),
      translation: formTranslation.trim(),
      example: formExample.trim(),
      meaning: formMeaning.trim(),
      isFavorite: editing?.isFavorite ?? false,
    }
    if (!payload.english || !payload.translation) return

    // Быстрая проверка повтора без запроса к серверу
    const normalized = payload.english.toLowerCase()
    const localDuplicate = entries.some(
      (e) => e.id !== editingId && e.english.trim().toLowerCase() === normalized
    )
    if (localDuplicate) {
      pushToast('error', `Такое ${labels.itemAcc} уже есть`, 'Проверьте список — запись не добавлена.')
      return
    }

    setSaving(true)
    try {
      const result = editingId === null ? await createEntry(kind, payload) : await updateEntry(kind, editingId, payload)
      if (result === 'conflict') {
        pushToast('error', `Такое ${labels.itemAcc} уже есть`, 'Сервер отклонил повторную запись.')
        return
      }
      if (result === 'error') {
        pushToast('error', 'Не удалось сохранить', 'Сервер недоступен. Попробуйте позже.')
        return
      }
      const created = editingId === null
      closeForm()
      if (created) setPage(1)
      const refreshed = await refresh()
      if (!refreshed) {
        pushToast('error', 'Список не обновился', 'Запись сохранена на сервере. Обновите страницу.')
        return
      }
      pushToast('success', created ? `${labels.single} добавлено` : 'Изменения сохранены', payload.english)
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async (id: number) => {
    if (deletingIds.current.has(id)) return
    deletingIds.current.add(id)
    const entry = entries.find((e) => e.id === id)
    if (editingId === id) closeForm()
    try {
      const ok = await deleteEntry(kind, id)
      if (!ok) {
        pushToast('error', 'Не удалось удалить', 'Сервер недоступен. Попробуйте позже.')
        return
      }
      const refreshed = await refresh()
      if (!refreshed) {
        pushToast('error', 'Список не обновился', 'Запись удалена на сервере. Обновите страницу.')
        return
      }
      pushToast('success', 'Запись удалена', entry ? entry.english : '')
    } finally {
      deletingIds.current.delete(id)
    }
  }

  const thClass = 'bg-[#f4f7fb] px-5 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-stone-400'

  return (
    <>
      <header className="shrink-0">
        {!bare && (
          <>
            <p className="eyebrow text-[#7d8b9c]">{labels.eyebrow}</p>
            <h1 className="font-display mt-2 text-3xl leading-none text-[var(--tide)] sm:text-4xl">{labels.title}</h1>
          </>
        )}

      </header>

      {/* Тулбар: поиск и добавление */}
      <div className="mt-5 flex shrink-0 flex-col gap-2.5 sm:flex-row sm:flex-wrap sm:items-center">
        <div className="relative w-full sm:max-w-sm">
          <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400">
            <SearchIcon />
          </span>
          <input
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(1) }}
            placeholder={labels.searchPlaceholder}
            aria-label="Поиск"
            className="field field-search"
          />
          {search && (
            <button
              type="button"
              onClick={() => { setSearch(''); setPage(1) }}
              aria-label="Очистить поиск"
              title="Очистить поиск"
              className="absolute right-2.5 top-1/2 flex h-6 w-6 -translate-y-1/2 items-center justify-center rounded-full text-stone-400 transition-colors hover:bg-red-50 hover:text-red-600">
              <CloseIcon size={14} />
            </button>
          )}
        </div>
        {!lockFavorites && (
          <button type="button" onClick={openCreateModal} className={`${btnPrimary} w-full sm:w-auto`}>
            <PlusIcon />Добавить
          </button>
        )}
      </div>

      {/* Таблица: занимает оставшийся экран, пагинация всегда видна */}
      <div className="sheet mt-5 flex min-h-[280px] flex-1 flex-col overflow-hidden lg:min-h-0" aria-busy={status === 'loading'}>
        {status === 'loading' ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 px-6 py-16 text-center">
            <span className="loader" aria-hidden="true" />
            <p className="text-sm text-stone-500">Загрузка списка…</p>
          </div>
        ) : status === 'error' && entries.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center px-6 py-16 text-center">
            <p className="font-display text-2xl text-stone-800">Список не загрузился</p>
            <p className="mt-1 max-w-sm text-sm text-stone-500">Сервер не ответил.</p>
            <button type="button" onClick={() => void refresh()} className={`${btnPrimary} mt-5`}>
              Повторить
            </button>
          </div>
        ) : filtered.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center px-6 py-16 text-center">
            <span className="font-display text-5xl text-stone-300">Aa</span>
            <p className="font-display mt-4 text-2xl text-stone-800">
              {search ? 'Ничего не найдено' : lockFavorites ? 'В избранном пока пусто' : labels.emptyTitle}
            </p>
            <p className="mt-1 max-w-sm text-sm text-stone-500">
              {search
                ? 'Попробуйте изменить запрос.'
                : lockFavorites
                  ? 'Нажмите на звёздочку у записи, чтобы добавить её сюда.'
                  : labels.emptyAddHint}
            </p>
          </div>
        ) : (
          <>
          <ul key={`m-${safePage}-${search}`} className="page-fade divide-y divide-stone-100 lg:hidden">
            {paged.map((entry) => (
              <li key={entry.id} className="entry-row px-4 py-3.5">
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <p className="font-display text-[17px] leading-snug text-[var(--tide)]">{entry.english}</p>
                    <p className="mt-1 text-sm leading-relaxed text-stone-700">{entry.translation}</p>
                    {entry.example && <p className="mt-1 text-sm italic leading-relaxed text-stone-500">{entry.example}</p>}
                    <p className="mt-1.5 text-xs text-stone-400">{formatDate(entry.createdAt)}</p>
                  </div>
                  <span className="inline-flex shrink-0 items-center">
                    {canSpeak && (
                      <button
                        type="button"
                        onClick={() => speak(entry.english)}
                        aria-label={`Прослушать: ${entry.english}`}
                        className="flex h-10 w-10 items-center justify-center rounded-lg text-[#8aa394] hover:bg-[#e8f5ee] hover:text-[#16a34a]">
                        <SoundIcon />
                      </button>
                    )}
                    {entry.meaning && (
                      <button
                        type="button"
                        onClick={() => setMeaningEntry(entry)}
                        aria-label={`Значение: ${entry.english}`}
                        className="flex h-10 w-10 items-center justify-center rounded-lg border border-[#d5e4db] text-sm font-semibold text-[#8b9aab] hover:border-[#16a34a] hover:text-[#16a34a]">
                        ?
                      </button>
                    )}
                    <button
                      type="button"
                      onClick={() => void handleToggleFavorite(entry)}
                      aria-pressed={entry.isFavorite}
                      aria-label={entry.isFavorite ? `Убрать из избранного: ${entry.english}` : `В избранное: ${entry.english}`}
                      title="В избранное"
                      className={`flex h-10 w-10 items-center justify-center rounded-lg transition-colors ${
                        entry.isFavorite
                          ? 'text-amber-500 hover:bg-amber-50 hover:text-amber-600'
                          : 'text-[#8b9aab] hover:bg-amber-50 hover:text-amber-500'
                      }`}>
                      <StarIcon filled={entry.isFavorite} />
                    </button>
                    <button type="button" onClick={() => openEditModal(entry.id)} aria-label={`Изменить: ${entry.english}`} className="flex h-10 w-10 items-center justify-center rounded-lg text-[#5d6e82] hover:bg-[#e8f5ee] hover:text-[#16a34a]">
                      <EditIcon />
                    </button>
                    <button type="button" onClick={() => void handleDelete(entry.id)} aria-label={`Удалить: ${entry.english}`} className="flex h-10 w-10 items-center justify-center rounded-lg text-[#5d6e82] hover:bg-[#fdecec] hover:text-[#b42318]">
                      <TrashIcon />
                    </button>
                  </span>
                </div>
              </li>
            ))}
          </ul>
          <div ref={scrollRef} className="hidden max-h-[62vh] min-h-0 flex-1 overflow-auto overscroll-contain [scrollbar-gutter:stable] lg:block lg:max-h-none">
            <table className="w-full min-w-[920px] table-fixed border-collapse text-left">
              <colgroup>
                <col className="w-[24%]" />
                <col className="w-[27%]" />
                <col className="w-[29%]" />
                <col className="w-[150px]" />
                <col className="w-[142px]" />
              </colgroup>
              <thead className="sticky top-0 z-10">
                <tr className="border-b border-[#d5e4db] bg-[#f4f7fb]">
                  <th scope="col" className={`${thClass} pl-6`}>{kind === 'words' ? 'Слово' : 'Выражение'}</th>
                  <th scope="col" className={thClass}>Перевод</th>
                  <th scope="col" className={thClass}>Пример</th>
                  <th scope="col" className={thClass}>Создано</th>
                  <th scope="col" className={`${thClass} pr-6 text-right`}><span className="sr-only">Действия</span></th>
                </tr>
              </thead>
              <tbody key={`d-${safePage}-${search}`} className="page-fade divide-y divide-stone-100">
                {paged.map((entry) => (
                    <tr key={entry.id} className="entry-row group h-16 align-middle last:border-b-0">
                      <td className="overflow-hidden px-6 py-2.5">
                        <span className="font-display block truncate text-[17px] leading-snug text-[var(--tide)]" title={entry.english}>{entry.english}</span>
                      </td>
                      <td className="overflow-hidden px-5 py-2.5 text-[13px] leading-relaxed text-stone-700">
                        <span className="line-clamp-2">{entry.translation}</span>
                      </td>
                      <td className="overflow-hidden px-5 py-2.5 text-[13px] italic leading-relaxed text-stone-500" title={entry.example || undefined}>
                        {entry.example ? <span className="line-clamp-2">{entry.example}</span> : <span className="not-italic text-stone-300">—</span>}
                      </td>
                      <td className="whitespace-nowrap px-5 py-2.5 text-xs text-stone-500">{formatDate(entry.createdAt)}</td>
                    <td className="whitespace-nowrap py-3.5 pl-5 pr-6 text-right">
                      <span className="row-actions inline-flex items-center gap-0.5">
                        {canSpeak && (
                          <button
                            type="button"
                            onClick={() => speak(entry.english)}
                            aria-label={`Прослушать: ${entry.english}`}
                            title="Прослушать"
                            className={iconBtn}>
                            <SoundIcon />
                          </button>
                        )}
                        {entry.meaning && (
                          <button
                            type="button"
                            onClick={() => setMeaningEntry(entry)}
                            aria-label={`Значение: ${entry.english}`}
                            title="Значение"
                            className={`${iconBtn} border border-[#d5e4db] text-[11px] font-semibold`}>
                            ?
                          </button>
                        )}
                        <button
                          type="button"
                          onClick={() => void handleToggleFavorite(entry)}
                          aria-pressed={entry.isFavorite}
                          aria-label={entry.isFavorite ? `Убрать из избранного: ${entry.english}` : `В избранное: ${entry.english}`}
                          title="В избранное"
                          className={`${iconBtn} ${
                            entry.isFavorite
                              ? 'text-amber-500 hover:bg-amber-50 hover:text-amber-600'
                              : 'hover:bg-amber-50 hover:text-amber-500'
                          }`}>
                          <StarIcon filled={entry.isFavorite} />
                        </button>
                        <button type="button" onClick={() => openEditModal(entry.id)} aria-label={`Изменить: ${entry.english}`} title="Изменить" className={iconBtn}>
                          <EditIcon />
                        </button>
                        <button type="button" onClick={() => void handleDelete(entry.id)} aria-label={`Удалить: ${entry.english}`} title="Удалить" className={`${iconBtn} icon-danger`}>
                          <TrashIcon />
                        </button>
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          </>
        )}
        <Pagination
          page={safePage}
          pageCount={pageCount}
          total={filtered.length}
          onPageChange={setPage}
          query={search.trim()}
          favoritesActive={lockFavorites}
        />
      </div>

      {/* Модальное окно добавления / редактирования */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center sm:p-4" role="dialog" aria-modal="true" aria-labelledby="entry-form-title">
          <button type="button" aria-label="Закрыть" onClick={closeForm} className="modal-scrim" />
          <div className="animate-modal-in relative max-h-[92dvh] w-full max-w-xl overflow-y-auto rounded-t-3xl bg-white p-5 pb-[max(1.25rem,env(safe-area-inset-bottom))] shadow-2xl sm:rounded-3xl sm:p-7">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className={`eyebrow ${kind === 'words' ? 'text-[#16a34a]' : 'text-[#16a34a]'}`}>{editingId === null ? 'Новая запись' : 'Редактирование'}</p>
                <h3 id="entry-form-title" className="font-display mt-1 text-3xl leading-tight">
                  {editingId === null ? labels.newItem : labels.editItem}
                </h3>
              </div>
              <button
                type="button"
                onClick={closeForm}
                aria-label="Закрыть форму"
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-stone-400 transition-colors hover:bg-red-50 hover:text-red-600">
                <CloseIcon size={18} />
              </button>
            </div>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              <label className="block">
                <span className="mb-1.5 block text-xs font-medium text-stone-500">{kind === 'words' ? 'Слово' : 'Выражение'} *</span>
                <input
                  value={formEnglish}
                  onChange={(e) => setFormEnglish(e.target.value)}
                  onKeyDown={(e) => { if (e.key === 'Enter') void handleSubmit() }}
                  placeholder={labels.englishPlaceholder}
                  className="field"
                />
              </label>
              <label className="block">
                <span className="mb-1.5 block text-xs font-medium text-stone-500">Перевод *</span>
                <input
                  value={formTranslation}
                  onChange={(e) => setFormTranslation(e.target.value)}
                  onKeyDown={(e) => { if (e.key === 'Enter') void handleSubmit() }}
                  placeholder="От популярного к редкому"
                  className="field"
                />
              </label>
              <label className="block sm:col-span-2">
                <span className="mb-1.5 block text-xs font-medium text-stone-500">Пример</span>
                <input
                  value={formExample}
                  onChange={(e) => setFormExample(e.target.value)}
                  placeholder="Пример употребления"
                  className="field"
                />
              </label>
              <label className="block sm:col-span-2">
                <span className="mb-1.5 block text-xs font-medium text-stone-500">Значение</span>
                <textarea
                  value={formMeaning}
                  onChange={(e) => setFormMeaning(e.target.value)}
                  placeholder={labels.meaningPlaceholder}
                  rows={3}
                  className="field"
                />
              </label>
            </div>
            <div className="mt-5 flex justify-end gap-2.5">
              <button type="button" onClick={() => void handleSubmit()} disabled={saving || !formEnglish.trim() || !formTranslation.trim()} className={`${btnPrimary} w-full sm:w-auto`}>
                {saving ? 'Сохранение…' : 'Сохранить'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Модальное окно значения */}
      {meaningEntry && (
        <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center sm:p-4" role="dialog" aria-modal="true" aria-labelledby="meaning-title">
          <button type="button" aria-label="Закрыть" onClick={() => setMeaningEntry(null)} className="modal-scrim" />
          <div className="animate-modal-in relative max-h-[85dvh] w-full max-w-lg overflow-y-auto rounded-t-3xl bg-white p-5 pb-[max(1.25rem,env(safe-area-inset-bottom))] shadow-2xl sm:rounded-3xl sm:p-8">
            <div className="flex items-start justify-between gap-3">
              <p className="eyebrow text-stone-400">Значение {labels.itemGen}</p>
              <button
                type="button"
                onClick={() => setMeaningEntry(null)}
                aria-label="Закрыть"
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-stone-400 transition-colors hover:bg-red-50 hover:text-red-600">
                <CloseIcon size={18} />
              </button>
            </div>
            <h3 id="meaning-title" className="font-display mt-2 text-3xl leading-tight text-[var(--tide)] sm:text-4xl">{meaningEntry.english}</h3>
            <p className="mt-1.5 text-[15px] text-stone-600">{meaningEntry.translation}</p>
            <hr className="my-5 border-stone-100" />
            <p className="text-[15px] leading-relaxed text-stone-700">{meaningEntry.meaning}</p>
            {meaningEntry.example && (
              <p className="font-display mt-4 border-l-2 border-[#16a34a] pl-3 text-[15px] italic leading-relaxed text-stone-500">
                “{meaningEntry.example}”
              </p>
            )}
          </div>
        </div>
      )}

      {/* Тосты */}
      <div className="pointer-events-none fixed right-4 bottom-[calc(5.25rem+env(safe-area-inset-bottom))] z-[70] flex w-[min(24rem,calc(100vw-2rem))] max-w-sm flex-col gap-2 md:right-5 md:bottom-5" role="status" aria-live="polite">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className="animate-toast-in pointer-events-auto flex items-start gap-3 rounded-2xl border border-stone-200 bg-white p-4 shadow-xl">
            <span
              className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${
                toast.type === 'error' ? 'bg-red-100 text-red-600' : 'bg-emerald-100 text-emerald-600'
              }`}>
              {toast.type === 'error' ? <ToastErrorIcon /> : <ToastSuccessIcon />}
            </span>
            <span className="min-w-0 flex-1">
              <span className="block text-sm font-semibold text-stone-900">{toast.title}</span>
              <span className="mt-0.5 block truncate text-[13px] text-stone-500">{toast.message}</span>
            </span>
            <button
              type="button"
              onClick={() => dismissToast(toast.id)}
              aria-label="Закрыть уведомление"
              className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-stone-400 transition-colors hover:bg-red-50 hover:text-red-600">
              <CloseIcon />
            </button>
          </div>
        ))}
      </div>
    </>
  )
}

export default EntrySection
