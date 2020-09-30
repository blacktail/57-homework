import React, { useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Icon, { ArrowRightOutlined } from '@ant-design/icons'
import { Button } from 'antd'
import { ReactComponent as TranslationSVG } from '../../../assets/icons/translation.svg'
import styles from './index.css'

function Footer() {
  const curLang = useSelector((state) => state.lang.current)
  const dispatch = useDispatch()

  const changeLang = useCallback(() => {
    dispatch({ type: 'lang/change', payload: curLang === 'zh' ? 'en' : 'zh' })
  }, [curLang, dispatch])

  return (
    <div className={styles.footer}>
      <div className={styles.copyright}>Copyright 2020 Homework.</div>
      <div className={styles.lang} style={{ display: 'none' }}>
        <Button size="small" style={{ float: 'right' }} onClick={changeLang}>
          <Icon component={TranslationSVG} />
          {curLang === 'zh' ? '中文' : 'English'}
          <ArrowRightOutlined />
          {curLang === 'zh' ? 'English' : '中文'}
        </Button>
      </div>
    </div>
  )
}

export default Footer
