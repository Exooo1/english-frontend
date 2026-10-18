import type { Rule } from '../types'
import { EXPLAIN } from './explain'
import { ADJECTIVES } from './a1-adjectives'
import { CAN } from './a1-can'
import { CONTINUOUS } from './a1-continuous'
import { FUTURE } from './a1-future'
import { HAVE_GOT } from './a1-have'
import { IMPERATIVES } from './a1-imperatives'
import { MODALS } from './a1-modals'
import { NOUNS } from './a1-nouns'
import { PAST } from './a1-past'
import { PHONETICS } from './a1-phonetics'
import { PHRASES } from './a1-phrases'
import { PREPOSITIONS } from './a1-prepositions'
import { PRESENT } from './a1-present'
import { PRONOUNS } from './a1-pronouns'
import { QUESTIONS } from './a1-questions'
import { TO_BE } from './a1-to-be'
import { VOCAB } from './a1-vocab'

// Порядок массива — порядок обучения внутри блока. Блоки идут по номеру в curriculum.ts.
export const RULES: Rule[] = [
  ...PHONETICS,
  ...PRONOUNS,
  ...TO_BE,
  ...NOUNS,
  ...HAVE_GOT,
  ...PRESENT,
  ...CAN,
  ...IMPERATIVES,
  ...CONTINUOUS,
  ...PAST,
  ...FUTURE,
  ...MODALS,
  ...PREPOSITIONS,
  ...ADJECTIVES,
  ...QUESTIONS,
  ...VOCAB,
  ...PHRASES,
]

const ruleIds = new Set(RULES.map((rule) => rule.id))
const missing = RULES.filter((rule) => !EXPLAIN[rule.id]).map((rule) => rule.id)
const extra = Object.keys(EXPLAIN).filter((id) => !ruleIds.has(id))
if (missing.length > 0 || extra.length > 0) {
  throw new Error(`Объяснения правил: нет [${missing.join(', ')}], лишние [${extra.join(', ')}]`)
}
