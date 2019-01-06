import React from 'react';
import request from 'api';
import moment from 'moment';
import { LOGOUT_KEY } from 'consts';
import { LocaleProvider } from 'antd';
import { Provider } from 'react-redux';
import withRedux from 'next-redux-wrapper';
import NextApp, { Container } from 'next/app';
import viVN from 'antd/lib/locale-provider/vi_VN';
import { IntlProvider, addLocaleData } from 'react-intl';
import { getUserFromServerCookie, getUserFromLocalCookie } from 'utils/auth';
import {
  initStore,
  setUserInfo,
  requestLogout,
  setClock,
  setInfo
} from 'utils/redux';
import 'moment/locale/vi';
import 'antd/dist/antd.less';

moment.locale('vi');

if (typeof window !== 'undefined' && window.ReactIntlLocaleData) {
  Object.keys(window.ReactIntlLocaleData).forEach((lang) => {
    addLocaleData(window.ReactIntlLocaleData[lang])
  })
}

class App extends NextApp {
  logout = (e) => {
    if (e.key === LOGOUT_KEY)
      this.props.store.dispatch(requestLogout());
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
              {Component.Layout ?
                <Component.Layout>
                  <Component {...pageProps} />
                </Component.Layout>
                : <Component {...pageProps} />}
            </LocaleProvider>
          </IntlProvider>
        </Provider>
      </Container >)
  }
}

App.getInitialProps = async ({ Component, ctx }) => {
  const pageProps = Component.getInitialProps ? await Component.getInitialProps(ctx) : {}
  const { locale, messages } = ctx.req || window.__NEXT_DATA__.props;
  try {
    const { store, isServer } = ctx;
    let loggedUser;
    if (isServer) {
      store.dispatch(setClock());
      loggedUser = getUserFromServerCookie(ctx.req);
    } else {
      loggedUser = getUserFromLocalCookie();
    }
    if (!!loggedUser)
      store.dispatch(setUserInfo(loggedUser));
    const info = JSON.parse(await request.getSetting('CompanyProfile'));
    store.dispatch(setInfo({ 'COMMON': info }));
  } catch (error) { }
  return { pageProps, locale, messages }
}

export default withRedux(initStore)(App)