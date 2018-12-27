import React from 'react'
import request from 'api'
import { Menu } from 'antd'
import { FormattedMessage } from 'react-intl';

const Item = Menu.Item

export default class Province extends React.Component {
  state = { provinces: [] }

  componentDidMount() {
    request.getProvinceList()
      .then(({ content: provinces }) => { this.setState({ provinces }) })
  }

  render() {
    const { provinces } = this.state
    const { selected, onSelect } = this.props
    return (<Menu
      mode="inline"
      selectedKeys={[selected]}
      onSelect={onSelect}>
      <Item key="all"><FormattedMessage id="All" /></Item>
      {provinces.map((item) => (<Item key={item.id}>{item.name}</Item>))}
    </Menu>)
  }
}