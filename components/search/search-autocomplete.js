import React from 'react'
import { Icon, Input, AutoComplete } from 'antd'

const Option = AutoComplete.Option
const OptGroup = AutoComplete.OptGroup

const dataSource =
  [
    {
      title: 'Tìm kiếm gần đây',
      items: [{
        title: 'Mường Thanh',
        count: 'Khách sạn',
      }]
    },
    {
      title: 'Địa điểm du lịch',
      items: [
        {
          title: 'Thành phố Hà Nội',
          count: 'Vùng',
        },
        {
          title: 'Thành phố Đà Nẵng',
          count: 'Vùng',
        }],
    },
    {
      title: 'Khách sạn',
      items: [
        {
          title: 'FCL Thanh Hóa',
          count: 'Khách sạn',
        }],
    }
  ]

const options = dataSource.map(group => (
  <OptGroup
    key={group.title}
    label={<div className="dropdown__title">{group.title}</div>}
  >
    {group.items.map(opt => (
      <Option
        key={opt.title}
        value={opt.title}>
        <span>{opt.title}</span>
        <span className="dropdown__label">{opt.count}</span>
      </Option>
    ))}
  </OptGroup>
))

export default class SearchAutocomplete extends React.PureComponent {

  state = { loading: false }

  render() {
    const { loading } = this.state
    const { placeholder, onFocus } = this.props
    return (
      <AutoComplete
        style={{ width: '100%' }}
        placeholder={placeholder}
        dataSource={[...options,
        <Option
          disabled
          key="all"
          className="dropdown__loading">
          <Icon theme="outlined" type={`${loading ? 'loading' : 'search'}`} />
        </Option>]}
        className="search__autocomplete autocomplete"
        dropdownClassName="search__dropdown dropdown"
        dropdownMatchSelectWidth={false}
        optionLabelProp="value"
      >
        <Input className="search-input"
          onFocus={onFocus}
          suffix={<Icon type="environment" />} />
      </AutoComplete>
    )
  }
}