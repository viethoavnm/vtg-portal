import React from 'react'
import request from 'api'
import { Select } from 'antd'
import { FormattedMessage } from 'react-intl';

const Option = Select.Option;

export default class Province extends React.Component {
  state = { provinces: [] }

  componentDidMount() {
    request.getProvinceList()
      .then(({ content: provinces }) => { this.setState({ provinces }) })
  }

  render() {
    const { provinces } = this.state
    const { selected, onSelect } = this.props
    return (
      <Select
        value={selected}
        onSelect={onSelect}
        style={{ width: '100%' }}>
        <Option key="all"><FormattedMessage id="All" /></Option>
        {provinces.map((item) => (<Option key={item.id}>{item.name}</Option>))}
      </Select>)
  }
}