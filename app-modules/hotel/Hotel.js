import React from 'react';
import request from 'api'
import SortBar from './Sortbar';
import Filter from './HotelFilter';
import HotelList from './HotelList';
import Search from 'components/search';
import Banner from 'components/banner';
import { Icon, Breadcrumb } from 'antd';
import { connect } from 'react-redux';
import { withRouter } from 'next/router';

class Hotel extends React.Component {
  state = { content: [], page: 0, size: 10 }

  fetch() {
    const { query } = this.props.router;
    const { page, size } = this.state;
    query.startDate = new Date().toISOString();
    query.endDate = new Date().toISOString();
    query.numberOfRoom = 1;
    query.numberOfCustomer = 2;
    request.getHotelListToBooking({ ...query, page, size })
      .then((data) => {
        this.setState({ ...data })
      })
      .catch();
  }

  componentDidMount() {
    this.fetch();
  }

  render() {
    const { pageInfo, place } = this.props;
    return (
      <React.Fragment>
        <Banner pageInfo={pageInfo} />
        <div className="container hotel d-flex">
          <div className="hotel-nav">
            <Search vertical />
            {/* <div className="mini-map"></div> */}
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
                  <span>{place.name}</span>
                </Breadcrumb.Item>
              </Breadcrumb>
            </div>
            <div className="hotel-title">
              <span>Khách sạn tại {place.name}</span>
            </div>
            <SortBar />
            <HotelList {...this.state} />
          </div>
        </div>
      </React.Fragment>
    )
  }
}

export default withRouter(connect((state) => ({ pageInfo: state.info.HOTEL }))(Hotel));