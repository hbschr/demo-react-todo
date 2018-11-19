/**
 * store json representation of `object` under given `key` in localStorage.
 */
export function setObject (key, object) {
  localStorage.setItem(key, JSON.stringify(object))
}

/**
 * retrieve object from localStorage. if data under given `key` is unset or not valid json `null` will be returned.
 */
export function getObject (key) {
  try {
    return JSON.parse(localStorage.getItem(key))
  } catch (e) {
    console.error(e)
    return null
  }
}

/**
 * returns tuple of `setObject` and `getObject` prebound to given `key`.
 */
export function objectStorage (key) {
  return [setObject.bind(null, key), getObject.bind(null, key)]
}
