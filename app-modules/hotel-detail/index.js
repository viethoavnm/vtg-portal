import api from 'api';
import dynamic from 'next/dynamic';
import Layout from 'components/layout';
import './Detail.less';

const Detail = dynamic({ loader: () => import('./Detail') })

Detail.getInitialProps = async ({ query }) => {
  try {
    const hotel = await api.getHotelById(query.id);
    console.log(hotel);
    return ({ hotel })
  } catch (error) { }
  return { hotel: {} }
}

Detail.Layout = Layout;
export default Detail;