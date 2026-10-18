import { BookOpen, MessagesSquare, Star } from 'lucide-react'
import { useSearchParams } from 'react-router-dom'
import type { EntriesStatus } from './api'
import EntrySection from './entry-section'
import type { EntryLabels } from './entry-section'
import type { Entry } from './types'

export type VocabularyTab = 'words' | 'expressions' | 'favorites'

interface EntriesSource {
  entries: Entry[]
  refresh: () => Promise<boolean>
  status: EntriesStatus
}

interface VocabularyPageProps {
  words: EntriesSource
  expressions: EntriesSource
}

const wordLabels: EntryLabels = {
  eyebrow: 'Слова, перевод, пример',
  title: 'Слова',
  single: 'Слово',
  newItem: 'Новое слово',
  editItem: 'Редактирование слова',
  itemAcc: 'слово',
  itemGen: 'слова',
  englishPlaceholder: 'Слово (english)',
  meaningPlaceholder: 'Значение: поясните разницу со схожими словами (например, house и home)',
  searchPlaceholder: 'Поиск по слову, переводу, примеру',
  emptyTitle: 'Словарь пока пуст',
  emptyAddHint: 'Нажмите «Добавить», чтобы создать первое слово.',
}

const expressionLabels: EntryLabels = {
  eyebrow: 'Фразы, перевод, пример',
  title: 'Выражения',
  single: 'Выражение',
  newItem: 'Новое выражение',
  editItem: 'Редактирование выражения',
  itemAcc: 'выражение',
  itemGen: 'выражения',
  englishPlaceholder: 'Выражение (english)',
  meaningPlaceholder: 'Значение: поясните употребление (например, put off — откладывать дело)',
  searchPlaceholder: 'Поиск по выражению, переводу, примеру',
  emptyTitle: 'Выражений пока нет',
  emptyAddHint: 'Нажмите «Добавить», чтобы создать первое выражение.',
}

// Словарь: слова, выражения и общее избранное на одной странице.
// Вкладка живёт в URL (?tab=...), все секции смонтированы — поиск и страница не сбрасываются.
const VocabularyPage = ({ words, expressions }: VocabularyPageProps) => {
  const [params, setParams] = useSearchParams()
  const rawTab = params.get('tab')
  const tab: VocabularyTab =
    rawTab === 'expressions' ? 'expressions' : rawTab === 'favorites' ? 'favorites' : 'words'

  const selectTab = (next: VocabularyTab): void => {
    setParams(next === 'words' ? {} : { tab: next }, { replace: true })
  }

  const favoriteWords = words.entries.filter((entry) => entry.isFavorite)
  const favoriteExpressions = expressions.entries.filter((entry) => entry.isFavorite)
  const favoriteTotal = favoriteWords.length + favoriteExpressions.length

  const thumbClass =
    tab === 'expressions' ? 'dict-thumb is-middle' : tab === 'favorites' ? 'dict-thumb is-right' : 'dict-thumb'

  return (
    <>
      <header className="shrink-0">
        <p className="eyebrow text-[#7d8b9c]">Слова, перевод, пример</p>
        <h1 className="font-display mt-2 text-3xl leading-none text-[var(--tide)] sm:text-4xl">Словарь</h1>
      </header>
      <div className="dict-switch mt-4" role="tablist" aria-label="Разделы словаря">
        <span className={thumbClass} aria-hidden="true" />
        <button
          type="button"
          role="tab"
          aria-selected={tab === 'words'}
          onClick={() => selectTab('words')}
          className={tab === 'words' ? 'dict-tab is-on' : 'dict-tab'}>
          <BookOpen size={16} aria-hidden="true" />
          Слова
          <span className="dict-count tabular">{words.entries.length}</span>
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={tab === 'expressions'}
          onClick={() => selectTab('expressions')}
          className={tab === 'expressions' ? 'dict-tab is-on' : 'dict-tab'}>
          <MessagesSquare size={16} aria-hidden="true" />
          Выражения
          <span className="dict-count tabular">{expressions.entries.length}</span>
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={tab === 'favorites'}
          onClick={() => selectTab('favorites')}
          className={tab === 'favorites' ? 'dict-tab is-on' : 'dict-tab'}>
          <Star size={16} aria-hidden="true" fill={tab === 'favorites' ? 'currentColor' : 'none'} />
          Избранное
          <span className="dict-count tabular">{favoriteTotal}</span>
        </button>
      </div>

      <div className={tab === 'words' ? 'flex min-h-0 flex-1 flex-col' : 'hidden'}>
        <EntrySection
          kind="words"
          entries={words.entries}
          refresh={words.refresh}
          status={words.status}
          labels={wordLabels}
          bare
        />
      </div>
      <div className={tab === 'expressions' ? 'flex min-h-0 flex-1 flex-col' : 'hidden'}>
        <EntrySection
          kind="expressions"
          entries={expressions.entries}
          refresh={expressions.refresh}
          status={expressions.status}
          labels={expressionLabels}
          bare
        />
      </div>
      <div className={tab === 'favorites' ? 'flex min-h-0 flex-1 flex-col' : 'hidden'}>
        {favoriteTotal === 0 ? (
          <div className="sheet flex flex-1 flex-col items-center justify-center px-6 py-16 text-center">
            <span className="grid h-14 w-14 place-items-center rounded-2xl bg-amber-50 text-amber-500">
              <Star size={26} aria-hidden="true" />
            </span>
            <p className="font-display mt-4 text-2xl text-stone-800">В избранном пока пусто</p>
            <p className="mt-1 max-w-sm text-sm text-stone-500">
              Нажмите на звёздочку у слова или выражения, чтобы добавить его сюда.
            </p>
          </div>
        ) : (
          <>
            {favoriteWords.length > 0 && (
              <p className="mb-2 text-xs font-semibold uppercase tracking-[0.14em] text-[#8aa394]">
                Слова · <span className="tabular">{favoriteWords.length}</span>
              </p>
            )}
            {favoriteWords.length > 0 && (
              <EntrySection
                kind="words"
                entries={words.entries}
                refresh={words.refresh}
                status={words.status}
                labels={wordLabels}
                bare
                lockFavorites
              />
            )}
            {favoriteExpressions.length > 0 && (
              <p className="mb-2 mt-5 text-xs font-semibold uppercase tracking-[0.14em] text-[#8aa394]">
                Выражения · <span className="tabular">{favoriteExpressions.length}</span>
              </p>
            )}
            {favoriteExpressions.length > 0 && (
              <EntrySection
                kind="expressions"
                entries={expressions.entries}
                refresh={expressions.refresh}
                status={expressions.status}
                labels={expressionLabels}
                bare
                lockFavorites
              />
            )}
          </>
        )}
      </div>
    </>
  )
}

export default VocabularyPage
