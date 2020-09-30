import * as R from 'ramda'

const validatePhone = (rule, value, callback) => {
  if (!!value && !/^1(3|4|5|7|8)\d{9}$/.test(value)) {
    callback('The phone number format must be right')
  } else {
    callback()
  }
}

function validateEmailList(rule, value, callback) {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  const isPass = value |> R.map(R.trim) |> R.all(v => re.test(v))
  if (isPass && value.length <= 10) {
    callback()
  } else {
    callback(rule.message)
  }
}

export { validatePhone }
export { validateEmailList }
export default {
  validateEmailList,
  validatePhone,
}
