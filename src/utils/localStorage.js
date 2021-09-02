export function setItem(key, val) {
  localStorage.setItem(key, JSON.stringify(val))
}
export function getItem(key) {
  const value = localStorage.getItem(key)
  if (value) {
    return JSON.parse(localStorage.getItem(key))
  } else {
    return ''
  }
}
export function removeItem(key) {
  localStorage.removeItem(key)
}

export function clear() {
  localStorage.clear()
}
