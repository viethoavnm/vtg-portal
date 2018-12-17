import React from 'react'
import moment from 'moment'
import { Input, Icon, Button, Popover, DatePicker } from 'antd'
import RoomSelector from './room-selector'
import InputNumber from '../input-night/input-night'
import SearchAutocomplete from './search-autocomplete'
import { FormattedMessage } from 'react-intl';

function disabledStartDate(current) {
  return current && current < moment().subtract(1, 'day').endOf('day')
}

function disabledEndDate(current) {
  return current && current < moment().endOf('day')
}

const Search = ({ actions, data, vertical, backdrop, t }) => (
  <div className={`${backdrop ? 'floatOnBackdrop ' : ''}search search--${vertical ? 'vertical' : 'horizontal'}`}>
    {/*============SEARCH: INPUT==================*/}
    <div className="search__item search__item--input">
      <span className="search__label">{t('City, places or hotel')}</span>
      <SearchAutocomplete
        style={{ width: '100%' }}
        value={data.searchText}
        onFocus={actions.onFocus}
        placeholder={t('Hotel name, place')}
        onChange={(e) => { actions.onChange('searchText', e) }} />
    </div>
    {/*============SEARCH: DATE-TIME==================*/}
    <div className="search__item">
      <span className="search__label">{t('Start date')}</span>
      <DatePicker
        format="ll"
        allowClear={false}
        onFocus={actions.onFocus}
        onChange={(e) => { actions.onChange('startDate', e) }}
        value={data.startDate}
        disabledDate={disabledStartDate}
        placeholder={"START_DATE"}
      />
    </div>
    <div className="search__item">
      <span className="search__label">{t('End date')}</span>
      <DatePicker
        format="ll"
        allowClear={false}
        onFocus={actions.onFocus}
        disabledDate={disabledEndDate}
        onChange={(e) => { actions.onChange('returnDate', e) }}
        value={data.returnDate}
        placeholder={"RETURN_DATE"}
      />
    </div>
    <div className="search__item">
      <span className="search__label">{t('Night')}</span>
      <InputNumber
        className="search--input-night"
        date={data.startDate}
        onFocus={actions.onFocus}
        value={data.night}
        onChange={(e) => { actions.onChange('night', e.key) }}
      />
    </div>
    {/*============SEARCH: SELECT==================*/}
    <div className="search__item search__item--select">
      <span className="search__label">{t('Hotel and room')}</span>
      <Popover
        content={<RoomSelector
          values={data.roomNGuest}
          onDone={(e) => { actions.onChange('roomNGuest', e) }} />}
        placement="bottom"
        visible={data.showChooseRoom}
        onVisibleChange={actions.handleRoomPopover}
        onFocus={actions.onFocus}
        title={t('Hotel and room')}
        trigger="click">
        <Input suffix={<Icon type="down" />}
          readOnly
          className="pointer"
          value={t('%d rooms, %d guests', data.roomNGuest)}
        />
      </Popover>
    </div>
    {/*============SEARCH: BUTTON==================*/}
    <div className="search__item search__item--btn">
      <Button onClick={actions.onSearch} type="primary" className="top-space">
        <FormattedMessage id="Search" />
      </Button>
    </div>
  </div>
)


export default Search