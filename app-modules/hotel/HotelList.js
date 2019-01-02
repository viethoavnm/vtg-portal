import React from 'react';
import Card from './Card';

const HotelList = ({ content = [] }) => (
  <div className="hotel-list">
    {content.map((item, i) => (<Card key={i.toString()} item={item} />))}
  </div >
)

export default HotelList;