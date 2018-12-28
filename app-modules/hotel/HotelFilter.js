import React from 'react';
import { Slider, Checkbox, Rate } from 'antd';
import { FormattedMessage, injectIntl } from 'react-intl';

function formatter(value) {
  return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

class Filter extends React.Component {
  state = { prices: [0, 25000000] };

  onChange = (key) => (value) => {
    this.setState({ [key]: value });
  }

  render() {
    return (
      <React.Fragment>
        <div className="filter">
          <span className="title"><FormattedMessage id="Price range per night" /></span>
          <span className="d-flex justify-content-between">
            <FormattedMessage id="MIN" />
            <FormattedMessage id="MAX" />
          </span>
          <Slider range min={0} max={25000000} tipFormatter={formatter} step={100000} value={this.state.prices} onChange={this.onChange('prices')} />
          <span className="price-show">
            <span><FormattedMessage id="From" />: {formatter(this.state.prices[0])} </span> ~
            <span>{formatter(this.state.prices[1])} đ</span>
          </span>
        </div>
        <div className="filter">
          <span className="title"><FormattedMessage id="Type of hotel" /></span>
          <ul>
            <li><Checkbox>Khách sạn</Checkbox><span>110</span></li>
            <li><Checkbox>Nhà nghỉ</Checkbox><span>2340</span></li>
            <li><Checkbox>Homestay</Checkbox><span>34</span></li>
            <li><Checkbox>Resort</Checkbox><span>42</span></li>
            <li><Checkbox>Căn hộ</Checkbox><span>1160</span></li>
            <li><Checkbox>Biệt thự</Checkbox><span>234</span></li>
            <li><Checkbox>Du thuyền</Checkbox><span>5</span></li>
          </ul>
        </div>
        <div className="filter">
          <span className="title"><FormattedMessage id="Rating star" /></span>
          <ul>
            <li><Checkbox><Rate disabled value={1} count={1} /></Checkbox><span>66</span></li>
            <li><Checkbox><Rate disabled value={2} count={2} /></Checkbox><span>1120</span></li>
            <li><Checkbox><Rate disabled value={3} count={3} /></Checkbox><span>45</span></li>
            <li><Checkbox><Rate disabled value={4} count={4} /></Checkbox><span>123</span></li>
            <li><Checkbox><Rate disabled value={5} count={5} /></Checkbox><span>124</span></li>
            <li><Checkbox>Khác</Checkbox></li>
          </ul>
        </div>
        <div className="filter">
          <span className="title"><FormattedMessage id="Area" /></span>
          <ul>
            <li><Checkbox>Trung tâm thành phố</Checkbox><span>2345</span></li>
            <li><Checkbox>Chợ trung tâm</Checkbox><span>678</span></li>
            <li><Checkbox>Sân bay Đà Nẵng</Checkbox><span>123</span></li>
            <li><Checkbox>Bờ biển Mỹ Khê</Checkbox><span>45</span></li>
            <li><Checkbox>Ga Đà Nẵng</Checkbox><span>23</span></li>
          </ul>
        </div>
        <div className="filter">
          <span className="title"><FormattedMessage id="District" /></span>
          <ul>
            <li><Checkbox>Thanh Khê</Checkbox><span>89</span></li>
            <li><Checkbox>Sơn Trà</Checkbox><span>65</span></li>
            <li><Checkbox>Ngũ Hành Sơn</Checkbox><span>23</span></li>
            <li><Checkbox>Hải Châu</Checkbox><span>123</span></li>
            <li><Checkbox>Liên Chiểu</Checkbox><span>35</span></li>
          </ul>
        </div>
        <div className="filter">
          <span className="title"><FormattedMessage id="Utils" /></span>
          <ul>
            <li><Checkbox>Bãi đỗ xe</Checkbox><span>122</span></li>
            <li><Checkbox>Bể bơi</Checkbox><span>867</span></li>
            <li><Checkbox>Nhà hàng</Checkbox><span>456</span></li>
            <li><Checkbox>Trung tâm thể dục</Checkbox><span>23</span></li>
          </ul>
        </div>
      </React.Fragment>
    )
  }
}
export default injectIntl(Filter);