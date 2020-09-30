import { useEffect } from 'react'

export default function useDidMount(f) {
  return useEffect(f, []) // eslint-disable-line
}
