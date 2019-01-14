import React from 'react';
import moment from 'moment';
import Router from 'next/router';
import RoomSelector from './room-selector';
import InputNumber from '../input-night/input-night';
import SearchAutocomplete from './search-autocomplete';
import { injectIntl, FormattedMessage } from 'react-intl';
import { Input, Icon, Button, Popover, DatePicker } from 'antd';

class SearchWrapper extends React.Component {
  state = {
    selected: {},
    startDate: moment(),
    returnDate: moment().add(1, 'day'),
    night: 1,
    room: 1,
    guest: 2,
    visible: false
  }

  onChange = (key, value) => {
    if (key === 'startDate') {
      this.setState({
        startDate: value,
        returnDate: moment(value).add(this.state.night, 'day')
      })
      return;
    }
    if (key === 'returnDate') {
      if (value.diff(this.state.startDate, 'days') <= 0) {
        if (moment(value).subtract(this.state.night, 'day').diff(moment(), 'days') >= 0) {
          this.setState({ startDate: moment(value).subtract(this.state.night, 'day') })
        } else {
          this.setState({
            startDate: moment(value).subtract(1, 'day'),
            night: 1
          })
        }
      } else {
        this.setState({ night: value.diff(this.state.startDate, 'days') })
      }
    }
    if (key === 'night') {
      this.setState({
        night: value,
        returnDate: moment(this.state.startDate).add(value, 'day')
      })
      return;
    }
    if (key === 'roomAndGuest') {
      this.setState({ ...value })
    }
    this.setState({ [key]: value })
  }

  onSearch = () => {
    const { selected } = this.state;
    switch (selected.objectType) {
      case 'HOTEL':
        Router.push({
          pathname: `/hotel/${selected.id}`,
          query: {
            night: this.state.night,
            room: this.state.room,
            guest: this.state.guest,
            startDate: this.state.startDate.format('DDMMYYYY'),
            objectId: selected.id,
            objectType: 'HOTEL'
          }
        })
        break;
      case 'PLACE':
        Router.push({
          pathname: `/hotel`,
          query: {
            night: this.state.night,
            room: this.state.room,
            guest: this.state.guest,
            startDate: this.state.startDate.format('DDMMYYYY'),
            objectId: selected.id,
            objectType: 'PLACE'
          }
        })
        break;
      default:
        break;
    }
  }

  toggle = () => {
    this.setState({ visible: !this.state.visible });
  }

  t = (id, values) => (this.props.intl.formatMessage({ id }, values))

  render = () => {
    const { t } = this;
    const { vertical } = this.props;
    const { selected, room, guest, night, visible, startDate, returnDate } = this.state;
    const disabled = !this.state.selected.id;
    return (
      <div className={`search search--${vertical ? 'vertical' : 'horizontal'}`}>
        {/*============SEARCH: INPUT==================*/}
        <div className="search__item search__item--input">
          <span className="search__label">{t('City, places or hotel')}</span>
          <SearchAutocomplete
            value={selected}
            placeholder={t('Hotel name, place')}
            onChange={(e) => { this.onChange('selected', e) }} />
        </div>
        {/*============SEARCH: DATE-TIME==================*/}
        <div className="search__item">
          <span className="search__label">{t('Start date')}</span>
          <DatePicker
            value={startDate}
            allowClear={false}
            format="DD/MM/YYYY"
            onChange={(e) => { this.onChange('startDate', e) }}
            disabledDate={disabledStartDate}
            placeholder={"START_DATE"}
          />
        </div>
        <div className="search__item">
          <span className="search__label">{t('End date')}</span>
          <DatePicker
            allowClear={false}
            format="DD/MM/YYYY"
            disabledDate={disabledEndDate}
            onChange={(e) => { this.onChange('returnDate', e) }}
            value={returnDate}
            placeholder={"RETURN_DATE"}
          />
        </div>
        <div className="search__item">
          <span className="search__label">{t('Night')}</span>
          <InputNumber
            className="search--input-night"
            date={startDate}
            value={night}
            onChange={(e) => { this.onChange('night', e.key) }}
          />
        </div>
        {/*============SEARCH: SELECT==================*/}
        <div className="search__item search__item--select">
          <span className="search__label">{t('Hotel and room')}</span>
          <Popover
            content={<RoomSelector
              values={{ room, guest }}
              onDone={(e) => { this.onChange('roomAndGuest', e) }} />}
            placement="bottom"
            visible={visible}
            onVisibleChange={this.toggle}
            title={t('Hotel and room')}
            trigger="click">
            <Input suffix={<Icon type="down" />}
              readOnly
              className="pointer"
              value={t('%d rooms, %d guests', { room, guest })}
            />
          </Popover>
        </div>
        {/*============SEARCH: BUTTON==================*/}
        <div className="search__item search__item--btn">
          <Button
            type="primary"
            disabled={disabled}
            onClick={this.onSearch}
            className="top-space">
            <FormattedMessage id="Search" />
          </Button>
        </div>
      </div>
    )
  }
}

function disabledStartDate(current) {
  return current && current < moment().subtract(1, 'day').endOf('day')
}

function disabledEndDate(current) {
  return current && current < moment().endOf('day')
}

export default injectIntl(SearchWrapper)