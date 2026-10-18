// Настройки и пресеты повторения. Хранятся в localStorage, чтобы старт был в один клик.
import { canSpeak } from './speech'

export interface ReviewSettings {
  words: boolean
  expressions: boolean
  cardSeconds: number
  showTranslation: boolean
  translationSeconds: number
  voiceEnglish: boolean
  voiceTranslation: boolean
  // Голосовой режим: время не задаётся, переход — когда озвучка закончилась
  voiceAdvance: boolean
  // Конкретные голоса (voiceURI). Пусто — авто: лучший доступный
  voiceEnUri: string
  voiceRuUri: string
}

// Именованный пресет: полный снимок настроек повторения
export interface ReviewPreset {
  id: string
  name: string
  settings: ReviewSettings
}

export interface ReviewState {
  settings: ReviewSettings
  presets: ReviewPreset[]
}

export const REVIEW_STATE_KEY = 'linguaflow.review.v1'

export const MIN_SECONDS = 1
export const MAX_SECONDS = 60

export const CARD_PRESETS: readonly number[] = [1, 2, 3, 5, 10]
export const TRANSLATION_PRESETS: readonly number[] = [1, 2, 3, 5, 10]

export const MAX_PRESETS = 12

export const DEFAULT_REVIEW_SETTINGS: ReviewSettings = {
  words: true,
  expressions: true,
  cardSeconds: 2,
  showTranslation: true,
  translationSeconds: 2,
  voiceEnglish: true,
  voiceTranslation: false,
  voiceAdvance: false,
  voiceEnUri: '',
  voiceRuUri: '',
}

const asBoolean = (value: unknown, fallback: boolean): boolean =>
  typeof value === 'boolean' ? value : fallback

const asString = (value: unknown): string => (typeof value === 'string' ? value : '')

// Секунды приводим к целому и держим в безопасных границах
export const clampSeconds = (value: unknown, fallback: number): number => {
  const numeric = typeof value === 'number' ? value : Number(value)
  if (!Number.isFinite(numeric)) return fallback
  return Math.min(MAX_SECONDS, Math.max(MIN_SECONDS, Math.round(numeric)))
}

const normalizeSettings = (value: unknown): ReviewSettings => {
  const source = (typeof value === 'object' && value !== null ? value : {}) as Partial<ReviewSettings>
  return {
    words: asBoolean(source.words, DEFAULT_REVIEW_SETTINGS.words),
    expressions: asBoolean(source.expressions, DEFAULT_REVIEW_SETTINGS.expressions),
    cardSeconds: clampSeconds(source.cardSeconds, DEFAULT_REVIEW_SETTINGS.cardSeconds),
    showTranslation: asBoolean(source.showTranslation, DEFAULT_REVIEW_SETTINGS.showTranslation),
    translationSeconds: clampSeconds(source.translationSeconds, DEFAULT_REVIEW_SETTINGS.translationSeconds),
    voiceEnglish: asBoolean(source.voiceEnglish, DEFAULT_REVIEW_SETTINGS.voiceEnglish),
    voiceTranslation: asBoolean(source.voiceTranslation, DEFAULT_REVIEW_SETTINGS.voiceTranslation),
    voiceAdvance: asBoolean(source.voiceAdvance, DEFAULT_REVIEW_SETTINGS.voiceAdvance),
    voiceEnUri: asString(source.voiceEnUri),
    voiceRuUri: asString(source.voiceRuUri),
  }
}

const normalizePreset = (value: unknown): ReviewPreset | null => {
  if (typeof value !== 'object' || value === null) return null
  const source = value as { id?: unknown; name?: unknown; settings?: unknown }
  if (typeof source.id !== 'string' || typeof source.name !== 'string') return null
  const name = source.name.trim()
  if (!name) return null
  return { id: source.id, name: name.slice(0, 24), settings: normalizeSettings(source.settings) }
}

const normalizePresets = (value: unknown): ReviewPreset[] => {
  if (!Array.isArray(value)) return []
  return value
    .map(normalizePreset)
    .filter((preset): preset is ReviewPreset => preset !== null)
    .slice(0, MAX_PRESETS)
}

export const createPresetId = (): string =>
  `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`

const createDefaultState = (): ReviewState => ({
  settings: { ...DEFAULT_REVIEW_SETTINGS },
  presets: [],
})

export const loadReviewState = (): ReviewState => {
  if (typeof window === 'undefined') return createDefaultState()
  try {
    const raw = window.localStorage.getItem(REVIEW_STATE_KEY)
    if (!raw) return createDefaultState()
    const parsed = JSON.parse(raw) as { settings?: unknown; presets?: unknown }
    const settings = normalizeSettings(parsed.settings)
    // Голосовой режим держим в согласованном виде: без синтеза он невозможен,
    // а английская озвучка в нём всегда включена
    if (!canSpeak) settings.voiceAdvance = false
    else if (settings.voiceAdvance && !settings.voiceEnglish) settings.voiceEnglish = true
    return { settings, presets: normalizePresets(parsed.presets) }
  } catch {
    return createDefaultState()
  }
}

export const saveReviewState = (state: ReviewState): void => {
  try {
    window.localStorage.setItem(REVIEW_STATE_KEY, JSON.stringify(state))
  } catch {
    // Приватный режим: настройки не сохранятся, но тренажёр продолжит работать
  }
}
