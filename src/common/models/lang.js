import { setupI18n } from '@lingui/core'
import browserLang from 'browser-lang'
import en from '../../locales/en/messages'
import zh from '../../locales/zh/messages'

function getInitialLang() {
  const preferLang = browserLang({
    languages: ['en', 'zh'],
    fallback: 'en',
  })

  return window.localStorage.lang || preferLang
}

const initialLang = getInitialLang()

export const i18n = setupI18n({
  language: initialLang,
  catalogs: {
    en,
    zh,
  },
})

const lang = {
  state: {
    current: i18n.language,
  },
  effects: {
    change(newLang) {
      i18n.activate(newLang)

      this.update({
        current: newLang,
      })
      window.localStorage.lang = newLang
    },
  },
  reducers: {
    update(prev, data) {
      return {
        ...prev,
        ...data,
      }
    },
  },
}

export default lang
