import api from 'api';
import dynamic from 'next/dynamic';
import Layout from 'components/layout';
import './Detail.less';
import Axios from 'axios';

const Detail = dynamic({ loader: () => import('./Detail') })

Detail.getInitialProps = async ({ query }) => {
  try {
    const [hotel, rooms] = await Axios.all([
      api.getHotelById(query.id),
      api.getListRoomToBooking({
        hotelId: query.id,
        startDate: new Date().toISOString(),
        endDate: new Date().toISOString()
      })])
    return ({ hotel, rooms })
  } catch (error) { }
  return { hotel: {}, rooms: {} }
}

Detail.Layout = Layout;
export default Detail;