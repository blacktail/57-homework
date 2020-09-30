import { useState } from 'react'
import { useStore } from 'react-redux'

export default function useModel(model) {
  const store = useStore()
  useState(() => {
    store.model(model)
  })
}
