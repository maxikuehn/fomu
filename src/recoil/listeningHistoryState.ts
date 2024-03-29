import { atom } from "recoil"

interface ListeningHistoryEntry {
  uri: string
  name: string
  artists: { uri: string; name: string }[]
  image: string
  deleted: boolean
}

export const listeningHistoryState = atom<ListeningHistoryEntry[]>({
  key: "listeningHistoryState",
  default: [],
})

export const toggleDeleted = (
  history: ListeningHistoryEntry[],
  uri: string
) => {
  const index = history.findIndex((track) => track.uri === uri)
  if (index === -1) return history
  const newEntry = { ...history[index] }
  newEntry.deleted = !newEntry.deleted
  return [...history.slice(0, index), newEntry, ...history.slice(index + 1)]
}
