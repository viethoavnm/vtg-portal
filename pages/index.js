import request from 'api';
import dynamic from 'next/dynamic';
import { setInfo } from 'utils/redux';
import Layout from 'components/layout';

const Homepage = dynamic({ loader: () => import('app-modules/home') })

Homepage.getInitialProps = async ({ store }) => {
  try {
    const info = await request.getPageInfo('HOME')
    store.dispatch(setInfo({ 'HOME': info }))
  } catch (error) { }
  return
}

Homepage.Layout = Layout
export default Homepage