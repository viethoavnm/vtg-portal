import React from 'react';
import Preview from './Preview';
import About from './AboutHotel';
import Table from './DetailTable';
import DateTime from './DateTime';
import Rating from './UserRating';
import Policy from './HotelPolicy';
import Similar from './SimilarHotel';
import Services from './HotelServices';
import Amenities from './HotelAmenities';
import { Icon, Rate } from 'antd';

const Detail = ({ hotel }) => (
  <div className="detail container">
    <div className="row box">
      <div className="col-12">
        <span className="title">
          {hotel.name}
          <Rate value={5} disabled />
        </span>
        <p className="address"><Icon type="environment" /> {hotel.address}</p>
      </div>
    </div>
    <Preview thumbs={hotel.contentNames} />
    <Amenities />
    <DateTime />
    <Table data={[]} />
    <Services />
    <About />
    <Policy />
    <Rating />
    <Similar />
  </div>
)

export default Detail;