import React from 'react';
import api from 'api';
import moize from 'moize';
import { Icon, Input, AutoComplete } from 'antd';
import { FormattedMessage } from 'react-intl';
import Axios from 'axios';

const Option = AutoComplete.Option;
const OptGroup = AutoComplete.OptGroup;

export default class SearchAutocomplete extends React.PureComponent {

  state = { loading: false, hotels: [], places: [] }

  onSelectItem = (item) => () => {
    if (this.props.onChange) {
      this.props.onChange(item);
    }
  }

  onRenderHotelItem = (opt) => (
    <Option
      key={opt.name}
      value={opt.name}>
      <div onClick={this.onSelectItem({ ...opt, objectType: 'HOTEL' })}>
        <span>{opt.name}</span>
        <span className="dropdown__label">{opt.hotelType}</span>
      </div>
    </Option>
  )

  onRenderPlaceItem = (opt) => (
    <Option
      key={opt.name}
      value={opt.name}>
      <div onClick={this.onSelectItem({ ...opt, objectType: 'PLACE' })}>
        <span>{opt.name}</span>
        <span className="dropdown__label">PLACE</span>
      </div>
    </Option>
  )

  renderHotelItem = moize(this.onRenderHotelItem);
  renderPlaceItem = moize(this.onRenderPlaceItem);

  getOptions = () => {
    const options = [];
    const { hotels, places, loading } = this.state;
    if (hotels.length)
      options.push(
        <OptGroup
          key="hotel"
          label={<div className="dropdown__title">
            <FormattedMessage id="HOTEL" />
          </div>}>
          {hotels.map(this.renderHotelItem)}
        </OptGroup>)
    if (places.length) {
      options.push(
        <OptGroup
          key="hotel"
          label={<div className="dropdown__title">
            <FormattedMessage id="PLACE" />
          </div>}>
          {hotels.map(this.renderPlaceItem)}
        </OptGroup>)
    }
    options.push(
      <Option
        disabled
        key="all"
        className="dropdown__loading">
        <Icon theme="outlined" type={`${loading ? 'loading' : 'search'}`} />
      </Option>)
    return options;
  }

  onSearch = (key) => {
    this.setState({ loading: true })
    if (this.timeOut) {
      clearTimeout(this.timeOut);
    }
    this.timeOut = setTimeout(() => {
      Axios.all([api.getHotelListByNameFTS({ name: key, page: 0, size: 10 }), api.getPlaceListByNameFTS({ name: key, page: 0, size: 10 })])
        .then((data) => {
          const [hotelRes, placeRes] = data;
          const { content: hotels } = hotelRes;
          const { content: places } = placeRes;
          this.setState({ loading: false, hotels: hotels || [], places: places || [] })
        })
    }, 500)
  }

  onSelect = () => {

  }

  render() {
    const { placeholder } = this.props
    return (
      <AutoComplete
        onSearch={this.onSearch}
        placeholder={placeholder}
        dataSource={this.getOptions()}
        className="search__autocomplete autocomplete"
        dropdownClassName="search__dropdown dropdown"
        dropdownMatchSelectWidth={false}
        optionLabelProp="value">
        <Input className="search-input" suffix={<Icon type="environment" />} />
      </AutoComplete>
    )
  }
}