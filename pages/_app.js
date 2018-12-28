import React from 'react'
import Loader from 'components/loader'
import { LocaleProvider } from 'antd';
import NextApp, { Container } from 'next/app'
import { PageTransition } from 'next-page-transitions'
import { IntlProvider, addLocaleData } from 'react-intl'
import { getUserFromServerCookie } from 'utils/auth'
import request from 'api'
import withRedux from 'next-redux-wrapper'
import { Provider } from 'react-redux'
import viVN from 'antd/lib/locale-provider/vi_VN'
import {
  initStore,
  renderClock,
  setUserInfo,
  setInfo
} from 'utils/redux'
import moment from 'moment';
import 'moment/locale/vi';

moment.locale('vi')
const TIMEOUT = 400

if (typeof window !== 'undefined' && window.ReactIntlLocaleData) {
  Object.keys(window.ReactIntlLocaleData).forEach((lang) => {
    addLocaleData(window.ReactIntlLocaleData[lang])
  })
}

class App extends NextApp {
  logout = (e) => {
    if (e.key === 'logout')
      this.props.store.dispatch((setUserInfo(false)))
  }

  componentDidMount() {
    window.addEventListener('storage', this.logout, false)
  }

  componentWillUnmount() {
    window.removeEventListener('storage', this.logout, false)
  }

  componentDidCatch(error, errorInfo) {
    console.log('#ERR___', error)
    console.log('#ERR_INFO__', errorInfo)
    super.componentDidCatch(error, errorInfo)
  }

  render() {
    const { Component, pageProps, locale, messages, store } = this.props
    const now = Date.now()
    return (
      <Container>
        <Provider store={store}>
          <IntlProvider locale={locale} messages={messages} initialNow={now}>
            <LocaleProvider locale={viVN}>
              <PageTransition
                timeout={TIMEOUT}
                loadingDelay={400}
                loadingComponent={<Loader />}
                classNames='page-transition'
                loadingClassNames='loading-indicator'
                loadingTimeout={{ enter: TIMEOUT, exit: 0 }}
              >
                {Component.Layout ?
                  <Component.Layout>
                    <Component {...pageProps} />
                  </Component.Layout>
                  : <Component {...pageProps} />}
              </PageTransition>
            </LocaleProvider>
          </IntlProvider>
        </Provider>
      </Container >)
  }
}

App.getInitialProps = async ({ Component, ctx }) => {
  const pageProps = Component.getInitialProps ? await Component.getInitialProps(ctx) : {}
  const { locale, messages } = ctx.req || window.__NEXT_DATA__.props
  try {
    const { store, isServer } = ctx
    if (isServer) {
      const loggedUser = getUserFromServerCookie(ctx.req)
      const info = JSON.parse((await request.getSetting('1')).value);
      store.dispatch(renderClock())
      store.dispatch(setUserInfo(loggedUser))
      store.dispatch(setInfo({ 'COMMON': info }))
    }
  } catch (error) { }
  return { pageProps, locale, messages }
}

export default withRedux(initStore)(App)