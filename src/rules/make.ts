// Урок с формами глагола начинается с блока forms:
// три колонки — утверждение, отрицание, вопрос. В каждой фраза, перевод и схема.
// Дальше заголовки: как строится форма, употребление, маркеры. Примеры: английский и перевод.
import type { Rule, RuleBlock, RuleLevel } from '../types'

export const lesson = (
  level: RuleLevel,
  unit: string,
  id: string,
  title: string,
  subtitle: string,
  blocks: RuleBlock[],
): Rule => ({
  id,
  level,
  unit,
  title,
  subtitle,
  tag: subtitle,
  blocks,
})

export const ex = (en: string, ru: string, context?: string) =>
  context ? { en, ru, context } : { en, ru }

export const mis = (wrong: string, right: string, note: string) => ({ wrong, right, note })

export const drill = (question: string, answer: string) => ({ question, answer })
