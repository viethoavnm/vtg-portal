import request from 'api';
import dynamic from 'next/dynamic';
import { setInfo } from 'utils/redux';
import Layout from 'components/layout';

const Hotel = dynamic({ loader: () => import('app-modules/hotel/Hotel') })

Hotel.getInitialProps = async ({ store }) => {
  try {
    const info = await request.getPageInfo('HOTEL');
    store.dispatch(setInfo({ 'HOTEL': info }))
  } catch (error) { }
  return
}


Hotel.Layout = Layout;
export default Hotel;