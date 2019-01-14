import React from 'react';
import { Icon, Dropdown, Button, Menu } from 'antd';
import { FormattedMessage, FormattedNumber } from 'react-intl';

export default class DetailTable extends React.PureComponent {
  onBooking = () => {
    window.location = "#/payment"
  }
  render() {
    const { data } = this.props;
    return (
      <div className="table-wrapper">
        <div className="row t-head no-gutters">
          <div className="col-10">
            <div className="row">
              <div className="col-2"><FormattedMessage id="ROOM_TYPE" /></div>
              <div className="col-4"><FormattedMessage id="ROOM_POLICY" /></div>
              <div className="col-1 rm-pd"><FormattedMessage id="HUMAN_NUM" /></div>
              <div className="col-2"><FormattedMessage id="ROOM_NUM" /></div>
              <div className="col-3"><FormattedMessage id="ROOM_PRICE" /></div>
            </div>
          </div>
          <div className="col-2">
            <FormattedMessage id="YOUR_ORDER" />
          </div>
        </div>
        <div className="row no-gutters">
          <div className="col-10">
            {data.slice(0, 5).map((item) => (<RowItem key={item.id} item={item} />))}
          </div>
          <div className="col-2">
            <div className="payment box">
              <span><span className="selected">01</span> Phòng đôi</span>
              <span><span className="selected">02</span> Phòng đơn</span>
              <Button type="primary" onClick={this.onBooking}><FormattedMessage id="BOOKING" /></Button>
            </div>
          </div>
        </div>
      </div >
    )
  }
}
const dummy = {
  title: 'Phòng lớn loại sang',
  thumnail: '',
  square: 25,
  bed: '1 giường đơn',
  description: 'Hướng thành phố',
  policy: ['Bao gồm bữa sáng', 'Thanh toán tại khách sạn'],
  rooms: [0, 1, 2, 3],
  price_regular: 1000000,
  price_sale: 500000,
  discount: 50
}
const RowItem = ({ item }) =>
  (<div className="room-item box row no-gutters">
    <div className="col-2">
      <div className="thumbnail">
        <img src={item.thumbnail} alt={item.title} />
      </div>
    </div>
    <div className="col-4 room-type">
      <div className="type">
        <FormattedMessage id={`ROOM_TYPE_${item.type}`} />
      </div>
      <div className="square">
        <Icon type="minus" />
        <FormattedMessage id="N_SQUARE" values={{ value: item.square }} />
      </div>
      <div className="bed">
        <Icon type="minus" />{dummy.bed}
      </div>
      <div className="description">
        <Icon type="minus" />{dummy.description}
      </div>
      <div className="room-policy">
        <ul>
          {item.benefits.map((value) =>
            (<li key={value}>
              <FormattedMessage id={value} />
            </li>))}
        </ul>
      </div>
    </div>
    <div className="col-1 human-num">
      <FormattedMessage id="N_HUMAN" values={{ value: item.space }} />
    </div>
    <div className="col-2 room-amount">
      <FormattedMessage id="N_ROOM_AVAILIBLE" values={{ value: item.amount }} />
      <Dropdown
        className="r-dropdown"
        overlay={(<Menu>{dummy.rooms.map((room) =>
          (<Menu.Item key={room}>{room}</Menu.Item>))}</Menu>)}
        trigger={['click']}
      >
        <Button>
          0 &nbsp;&nbsp;&nbsp;
          <Icon type="down" />
        </Button>
      </Dropdown>
    </div>
    <div className="col-3 price">
      <span className="sale-off">-50%</span>
      <span className="price-per-night"><FormattedMessage id="PRICE_PER_NIGHT" /></span>
      <span className="strike">
        <FormattedNumber
          value={dummy.price_regular}
        />
        &nbsp;VND
      </span>
      <span>
        <FormattedMessage id="SALE_OFF_N" />&nbsp;
        <span className="last-price">
          <FormattedNumber value={dummy.price_sale} />
        </span>
        &nbsp;VND
      </span>
    </div>
  </div>);