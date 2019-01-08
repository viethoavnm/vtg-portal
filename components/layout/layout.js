import React from 'react';
import { BackTop } from 'antd';
import Router from 'next/router';
import NProgress from 'nprogress';
import Footer from 'components/footer';
import Header from 'components/header';

Router.onRouteChangeStart = () => NProgress.start();
Router.onRouteChangeComplete = () => {
  NProgress.done();
  window.scrollTo(0, 0);
};
Router.onRouteChangeError = () => NProgress.done();

const Layout = ({ children, info }) => (
  <React.Fragment>
    <Header />
    {children}
    <Footer info={info} />
    <BackTop />
  </React.Fragment>
)

export default Layout