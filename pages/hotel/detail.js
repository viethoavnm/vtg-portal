import dynamic from 'next/dynamic';
import Layout from 'components/layout';

const Hotel = dynamic({ loader: () => import('app-modules/hotel-detail') })
Hotel.Layout = Layout;

export default Hotel;