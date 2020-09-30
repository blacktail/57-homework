import React, { Suspense, lazy, useState, useCallback } from 'react'

import { HomeOutlined, MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons'

import { Layout, Menu } from 'antd'
import { Switch, Route } from 'react-router-dom'
import { Trans } from '@lingui/macro'
import NotFound from '../NotFound'
import styles from './index.css'

const { Header, Sider, Content } = Layout

const GMap = lazy(() => import(/* webpackChunkName: "user" */ '../../../app/GMap'))

function PageLayout({ history }) {
  const [collapsed, setCollapsed] = useState(true)

  const onToggle = useCallback(() => {
    setCollapsed(!collapsed)
    setTimeout(() => {
      window.dispatchEvent(new Event('resize'))
    }, 500)
  }, [collapsed])

  const onMenuClick = useCallback(
    ({ key }) => {
      history.push(`/${key}`)
    },
    [history]
  )

  return (
    <Layout style={{ height: '100%' }}>
      <Sider trigger={null} collapsible collapsed={collapsed} width={260} theme="light">
        <div className={styles.logo}>
          <div style={{ width: '100%', height: '100%' }} className={styles.logoImg} />
        </div>
        <Menu
          mode="inline"
          theme="light"
          style={{ borderTop: '1px solid #ccc', height: 'calc(100vh - 90px)', overflow: 'auto', overflowX: 'hidden' }}
          onClick={onMenuClick}
          defaultSelectedKeys="gmap"
          defaultOpenKeys="gmap"
        >
          <Menu.Item key="gmap">
            <HomeOutlined style={{ fontSize: '18px' }} />
            <span>
              <Trans>Google Map Demo</Trans>
            </span>
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout>
        <Header style={{ background: '#fff', padding: 0 }}>
          {collapsed ? (
            <MenuUnfoldOutlined className={styles.trigger} onClick={onToggle} />
          ) : (
            <MenuFoldOutlined className={styles.trigger} onClick={onToggle} />
          )}
        </Header>
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            background: '#fff',
            minHeight: '280px',
            overflow: 'hidden',
          }}
        >
          <Suspense fallback={<Trans>App is loading...</Trans>}>
            <Switch>
              <Route path="/" component={GMap} />
              <Route path="/404" component={NotFound} />
              <Route component={NotFound} />
            </Switch>
          </Suspense>
        </Content>
      </Layout>
    </Layout>
  )
}

export default PageLayout
