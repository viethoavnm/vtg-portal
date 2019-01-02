import React from 'react';
import { Icon, Rate, Button } from 'antd';
import { FormattedMessage } from 'react-intl';
import ImageLoader from 'components/image-loader';
import Satisfaction from 'components/satisfaction';
import { RESOURCES_PATH } from 'consts';

const Card = ({ item }) => (
  <div className="item animated fadeIn">
    <span className="item-start">
      <span className="product-right-icon" />
      <ImageLoader
        className="animated fadeIn"
        alt={item.name}
        src={RESOURCES_PATH + item.contentNames[0]}
      />
    </span>
    <div className="item-mid">
      <div className="title" title={item.name}>
        {item.name} <Rate value={item.statisticsRatingCount} disabled />
      </div>
      <div><Icon type="environment" /> {item.address}</div>
      <div><Icon type="compass" /> Trung tâm thành phố (Hà Nội) <b>5 km</b></div>
      <div className="rate">
        <Satisfaction rate={Math.floor((Math.random() * 21) + 80) / 10} />
        <span>({item.commentNumber} nhận xét)</span>
      </div>
      <div className="utils">
        <div className="u-item">
          <img src="/static/images/util-icons/ac.png" alt="utils-images" />
          <FormattedMessage id="ROOM_AC" />
        </div>
        <div className="u-item">
          <img src="/static/images/util-icons/packing.png" alt="utils-images" />
          <FormattedMessage id="ROOM_PACKING" />
        </div>
        <div className="u-item">
          <img src="/static/images/util-icons/wifi.png" alt="utils-images" />
          <FormattedMessage id="ROOM_WIFI" />
        </div>
      </div>
    </div>
    <div className="item-end">
      <span>Giá 1 đêm</span>
      <span className="price-regular">250.000 ₫</span>
      <span className="price-sale">Chỉ từ <span className="price">125.000</span> ₫</span>
      <div className="promotion">
        <Button type="primary" onClick={gotoHotelDetail(item.id)}>Xem phòng</Button>
      </div>
    </div>
    <span className="sale-tag sale-tag-square">-{item.price}% </span>
  </div>
);

export default Card;


function gotoHotelDetail(id) {
  return function () {
    window.location = `#/hotel/${id}`;
  }
}