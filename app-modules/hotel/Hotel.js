import React from 'react';
import Search from 'components/search';
import Banner from 'components/banner';
import Filter from './HotelFilter';
import SortBar from './Sortbar';
import { Icon, Breadcrumb } from 'antd';
import './Hotel.scss';

const Hotel = () => (
  <React.Fragment>
    <Banner pageInfo={{ contentNames: [] }} />
    <div className="container hotel d-flex">
      <div className="hotel-nav">
        <Search vertical />
        <div className="mini-map">
        </div>
        <Filter />
      </div>
      <div className="hotel-content">
        <div className="hotel-breadcrumb">
          <Breadcrumb>
            <Breadcrumb.Item href="#/">
              <Icon type="home" />
              <span>Trang chủ</span>
            </Breadcrumb.Item>
            <Breadcrumb.Item>
              <Icon type="crown" />
              <span>Thành phố Đà nẵng</span>
            </Breadcrumb.Item>
          </Breadcrumb>
        </div>
        <div className="hotel-title">
          <span>Khách sạn tại thành phố Đà Nẵng</span>
        </div>
        <SortBar />
      </div>
    </div>
  </React.Fragment>
);

export default Hotel;