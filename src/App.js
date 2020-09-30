import { hot } from 'react-hot-loader/root'
import React, { Suspense } from 'react'
import { I18nProvider } from '@lingui/react'
import { Trans } from '@lingui/macro'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { ConfigProvider } from 'antd'
import zhCN from 'antd/es/locale/zh_CN'
import enUS from 'antd/es/locale/en_US'
import { useI18n, useLang, useSelector } from 'common/hooks'
import { PageLayout } from 'common/components'
import './App.css'

function App() {
  const isInitialDataLoading = useSelector((state) => state.initial.loading)
  const i18n = useI18n()
  const lang = useLang()

  const isLoading = isInitialDataLoading === null || isInitialDataLoading === true
  const antdLocale = lang === 'zh' ? zhCN : enUS

  return (
    <I18nProvider i18n={i18n}>
      <ConfigProvider locale={antdLocale}>
        {isLoading ? (
          <Trans>App is loading...</Trans>
        ) : (
          <Router>
            <Suspense fallback={<Trans>App is loading...</Trans>}>
              <Switch>
                <Route component={PageLayout} />
              </Switch>
            </Suspense>
          </Router>
        )}
      </ConfigProvider>
    </I18nProvider>
  )
}

export default hot(App)
