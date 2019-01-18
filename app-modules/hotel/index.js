import request from 'api';
import dynamic from 'next/dynamic';
import { setInfo } from 'utils/redux';
import Layout from 'components/layout';
import Axios from 'axios';

const Hotel = dynamic({ loader: () => import('./Hotel') })

Hotel.getInitialProps = async ({ store, query }) => {
  try {
    const data = {};
    let info = {};
    switch (query.objectType) {
      case 'PLACE':
        const [place, hotel] = await Axios.all([request.getPlaceById(query.objectId), request.getPageInfo('HOTEL')])
        data.place = place;
        info = hotel;
        break;
      default:
        info = await request.getPageInfo('HOTEL');
        break;
    }
    store.dispatch(setInfo({ 'HOTEL': info }))
    return data;
  } catch (error) { }
  return;
}


Hotel.Layout = Layout;
export default Hotel;