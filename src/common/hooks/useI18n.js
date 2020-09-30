import { useSelector } from 'react-redux'
import { i18n } from '../models/lang'

export default function useI18n() {
  return i18n
}

export function useLang() {
  const [lang] = useSelector(state => state.lang.current)
  return lang
}
