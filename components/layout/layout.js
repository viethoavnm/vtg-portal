import React from 'react';
import { BackTop } from 'antd';
import Header from 'components/header';
import Footer from 'components/footer';
import Menu from 'components/menu';
import Router from 'next/router';
import NProgress from 'nprogress';
import './layout.scss';

Router.onRouteChangeStart = () => {
  NProgress.start()
}
Router.onRouteChangeComplete = () => NProgress.done()
Router.onRouteChangeError = () => NProgress.done()

const Layout = ({ children, pathname, info }) => (
  <React.Fragment>
    <Header />
    <Menu pathname={pathname} />
    {children}
    <Footer info={info} />
    <BackTop />
  </React.Fragment>
)

export default Layout