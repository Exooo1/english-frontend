// Типы приложения
export interface Entry {
  id: number
  english: string
  translation: string
  example: string
  meaning: string
  isFavorite: boolean
  createdAt: string
  updatedAt: string
}

export type Word = Entry

export type Expression = Entry

export type SectionId = 'words' | 'expressions' | 'rules'

// Блоки, из которых собирается страница правила
export type RuleBlock =
  | { type: 'lead'; text: string }
  | { type: 'heading'; text: string }
  | { type: 'text'; text: string }
  | { type: 'split'; items: { title: string; caption: string; example: string; translation: string }[] }
  | { type: 'table'; head: string[]; rows: string[][] }
  | { type: 'tiles'; items: { title: string; caption: string; text: string }[] }
  | { type: 'examples'; items: { en: string; ru: string; context?: string }[] }
  | { type: 'schemes'; items: string[] }
  | { type: 'forms'; items: { title: string; en: string; ru: string; formula: string }[] }
  | { type: 'mistakes'; items: { wrong: string; right: string; note: string }[] }
  | { type: 'practice'; items: { question: string; answer: string }[] }
  | { type: 'checklist'; items: string[] }
  | { type: 'callout'; title: string; text: string }

// Уровни английского + общие темы
export type RuleLevel = 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2' | 'general'

// Правило: один урок внутри нумерованного блока уровня
export interface RuleFormula {
  text: string
}

export interface Rule {
  id: string
  title: string
  subtitle: string
  tag: string
  level: RuleLevel
  unit: string
  blocks: RuleBlock[]
}
