import { useCallback, useEffect, useState } from 'react'
import type { Entry } from './types'

export type EntryKind = 'words' | 'expressions'

// Форма ответа Go-бэкенда
interface RawEntry {
  id: number
  english: string
  translation: string
  example?: string
  meaning?: string
  isFavorite?: boolean
  createdAt: string
  updatedAt: string
}

// Данные записи для создания и обновления
export interface EntryPayload {
  english: string
  translation: string
  example: string
  meaning: string
  isFavorite: boolean
}

async function request<T>(path: string, init?: RequestInit): Promise<T | null> {
  try {
    const res = await fetch(path, init)
    if (!res.ok) return null
    return (await res.json()) as T
  } catch {
    return null
  }
}

export type EntriesStatus = 'loading' | 'ready' | 'error'

const mapEntry = (raw: RawEntry): Entry => ({
  id: raw.id,
  english: raw.english,
  translation: raw.translation,
  example: raw.example ?? '',
  meaning: raw.meaning ?? '',
  isFavorite: raw.isFavorite ?? false,
  createdAt: raw.createdAt,
  updatedAt: raw.updatedAt,
})

export async function createEntry(kind: EntryKind, payload: EntryPayload): Promise<SaveResult> {
  return saveEntry('POST', `/api/${kind}`, payload)
}

export async function updateEntry(kind: EntryKind, id: number, payload: EntryPayload): Promise<SaveResult> {
  return saveEntry('PUT', `/api/${kind}/${id}`, payload)
}

// Результат сохранения: ok | conflict (такая запись уже есть, 409) | error
export type SaveResult = 'ok' | 'conflict' | 'error'

async function saveEntry(method: string, url: string, payload: EntryPayload): Promise<SaveResult> {
  try {
    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
    if (res.status === 409) return 'conflict'
    if (!res.ok) return 'error'
    return 'ok'
  } catch {
    return 'error'
  }
}

// Переключение избранного: шлём полную запись с инвертированным флагом
export async function toggleFavorite(kind: EntryKind, entry: Entry): Promise<boolean> {
  const result = await updateEntry(kind, entry.id, {
    english: entry.english,
    translation: entry.translation,
    example: entry.example,
    meaning: entry.meaning,
    isFavorite: !entry.isFavorite,
  })
  return result === 'ok'
}

export async function deleteEntry(kind: EntryKind, id: number): Promise<boolean> {
  try {
    const res = await fetch(`/api/${kind}/${id}`, { method: 'DELETE' })
    return res.ok
  } catch {
    return false
  }
}

// Записи живут только на сервере: никакого localStorage
export function useEntries(kind: EntryKind) {
  const [entries, setEntries] = useState<Entry[]>([])
  const [status, setStatus] = useState<EntriesStatus>('loading')

  const refresh = useCallback(async () => {
    const data = await request<RawEntry[]>(`/api/${kind}`)
    if (!Array.isArray(data)) {
      setStatus((current) => (current === 'loading' ? 'error' : current))
      return false
    }
    setEntries(data.map(mapEntry))
    setStatus('ready')
    return true
  }, [kind])

  useEffect(() => {
    void refresh()
  }, [refresh])

  return { entries, refresh, status }
}
