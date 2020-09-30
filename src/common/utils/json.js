export default function parseJSON(str, defaultValue = {}) {
  let result = defaultValue

  try {
    result = JSON.parse(str)
  } catch (e) {
    // ignore exception
  }

  return result
}
