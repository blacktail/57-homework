/* eslint-disable no-param-reassign */
import random from 'lodash.random'

export function sleep(t) {
  return new Promise((resolve) => {
    setTimeout(() => resolve(), t)
  })
}

export function getGravatar(email) {
  return `https://www.gravatar.com/avatar/${md5(email.toLowerCase().trim())}`
}

let id = 0
export function uniqId(prefix = '') {
  const uid = prefix + id
  id += 1
  return uid
}

export function toLocaleString(text, digit = 2, options = {}) {
  return text != null
    ? text.toLocaleString(undefined, { minimumFractionDigits: digit, maximumFractionDigits: digit, ...options })
    : ''
}

export function makeid(length = 8) {
  let result = ''
  const characters = '0123456789'
  const charactersLength = characters.length
  for (let i = 0; i < length; i += 1) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength))
  }
  return result
}

export function randomColor() {
  const colors = []
  for (let i = 0; i < 3; i += 1) {
    const color = random(0, 255)
    colors.push(color)
  }

  colors.push(1)

  return `rgba(${colors.join(',')})`
}

export default {
  sleep,
  getGravatar,
  uniqId,
  toLocaleString,
  makeid,
  randomColor,
}
