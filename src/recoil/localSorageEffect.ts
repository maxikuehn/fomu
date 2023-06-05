const localStorageEffect = (key: string) => ({ setSelf, onSet }) => {
  const savedValue = localStorage.getItem(key)
  if (savedValue != null) {
    setSelf(JSON.parse(savedValue))
  }

  // rome-ignore lint/suspicious/noExplicitAny: <explanation>
  onSet((newValue: any, _: any, isReset: boolean) => {
    isReset
      ? localStorage.removeItem(key)
      : localStorage.setItem(key, JSON.stringify(newValue))
  })
}
export default localStorageEffect
