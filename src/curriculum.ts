import type { RuleLevel } from './types'

// Нумерованный путь уровня. Новый блок — новая строка, уроки внутри идут по порядку массива правил.
export interface CurriculumUnit {
  id: string
  level: RuleLevel
  number: number
  title: string
  summary: string
}

export const CURRICULUM: CurriculumUnit[] = [
  { id: 'a1-phonetics', level: 'A1', number: 1, title: 'Фонетика и чтение', summary: 'Буквы, звуки, слоги и мелодия фразы. Сначала учимся читать вслух.' },
  { id: 'a1-pronouns', level: 'A1', number: 2, title: 'Местоимения', summary: 'Кто действует, чьё это и на что показывают.' },
  { id: 'a1-to-be', level: 'A1', number: 3, title: 'To be', summary: 'am, is, are и was, were: имя, возраст, место и состояние.' },
  { id: 'a1-nouns', level: 'A1', number: 4, title: 'Артикли и существительные', summary: 'Одна вещь, уже известная вещь, число и количество.' },
  { id: 'a1-have-got', level: 'A1', number: 5, title: 'Have got / has got', summary: 'Что есть у человека: вещи, семья, внешность.' },
  { id: 'a1-present-simple', level: 'A1', number: 6, title: 'Present Simple', summary: 'Привычки, факты и то, что бывает по расписанию.' },
  { id: 'a1-can', level: 'A1', number: 7, title: 'Can / can’t', summary: 'Умею, можно и короткая просьба.' },
  { id: 'a1-imperatives', level: 'A1', number: 8, title: 'Imperatives', summary: 'Команды, инструкции и Let’s.' },
  { id: 'a1-present-continuous', level: 'A1', number: 9, title: 'Present Continuous', summary: 'Что происходит сейчас или временно.' },
  { id: 'a1-past-simple', level: 'A1', number: 10, title: 'Past Simple', summary: 'Законченные события в прошлом.' },
  { id: 'a1-future', level: 'A1', number: 11, title: 'Future', summary: 'Планы через going to и решения через will.' },
  { id: 'a1-modals', level: 'A1', number: 12, title: 'Модальные и полумодальные', summary: 'Надо, нельзя и совет.' },
  { id: 'a1-prepositions', level: 'A1', number: 13, title: 'Предлоги', summary: 'Где предмет, когда событие и куда идут.' },
  { id: 'a1-adjectives', level: 'A1', number: 14, title: 'Прилагательные и наречия', summary: 'Какой предмет, сравнение и как происходит действие.' },
  { id: 'a1-questions', level: 'A1', number: 15, title: 'Вопросительные слова', summary: 'Что, кто, где, сколько и к кому вопрос.' },
  { id: 'a1-vocab', level: 'A1', number: 16, title: 'Лексика A1', summary: 'Слова по бытовым темам. Учите блок за блоком и сразу в фразе.' },
  { id: 'a1-phrases', level: 'A1', number: 17, title: 'Фразы A1', summary: 'Готовые реплики: знакомство, магазин, дорога, извинение.' },
]

export const unitsFor = (level: RuleLevel): CurriculumUnit[] =>
  CURRICULUM.filter((unit) => unit.level === level).sort((a, b) => a.number - b.number)

export const unitById = (id: string): CurriculumUnit | undefined => CURRICULUM.find((unit) => unit.id === id)
