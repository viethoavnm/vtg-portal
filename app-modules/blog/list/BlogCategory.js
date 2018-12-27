import React from 'react'
import request from 'api'
import { Menu } from 'antd'
import { FormattedMessage } from 'react-intl'

const Item = Menu.Item

export default class Category extends React.Component {
  state = { categories: [], provinces: [] }

  componentDidMount() {
    request.getCategoryList()
      .then((categories) => { this.setState({ categories }) })
    request.getProvinceList()
      .then(({ content: provinces }) => { this.setState({ provinces }) })
  }

  render() {
    const { categories } = this.state
    const { selected, onSelect } = this.props
    return (<Menu
      mode="inline"
      selectedKeys={[selected]}
      onSelect={onSelect}>
      <Item key="all"><FormattedMessage id="All" /></Item>
      {categories.map((item) => (<Item key={item.id}>{item.title}</Item>))}
    </Menu>)
  }
}