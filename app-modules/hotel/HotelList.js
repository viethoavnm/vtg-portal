import React from 'react';
import Card from './Card';
import { List } from 'antd';

const HotelList = ({ content = [] }) => (
  <div className="hotel-list">
    <List
      dataSource={content}
      renderItem={(item) => { return <Card key={item.id} item={item} /> }}
    />
  </div >
)

export default HotelList;