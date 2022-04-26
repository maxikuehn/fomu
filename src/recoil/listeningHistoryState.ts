import { atom } from "recoil"

interface ListeningHistoryEntry {
  uri: string
  name: string
  artistNames: string
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
  let newEntry = { ...history[index] }
  newEntry.deleted = true
  return [...history.slice(0, index), newEntry, ...history.slice(index + 1)]
}
