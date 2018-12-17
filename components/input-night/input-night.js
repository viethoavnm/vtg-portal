import React from 'react'
import moize from 'moize'
import moment from 'moment'
import { Button, Dropdown, Icon, Menu } from 'antd'
import './input-night.scss'
import { FormattedMessage } from 'react-intl';

const MAX_NIGHT = 30

export default class InputN extends React.PureComponent {
  constructor(props) {
    super(props)
    this.menu = this.genWithMoize(props.value, props.date)
  }
  genWithMoize = moize(genarateMenus)
  componentWillReceiveProps({ date, value = 1 }) {
    this.menu = this.genWithMoize(value, date)
  }

  render() {
    return (<Dropdown
      className="input-night"
      overlay={(<Menu onClick={this.props.onChange} className="input-night--menu">{this.menu}</Menu>)}
      trigger={['click']}>
      <Button className="input-night--btn">
        <FormattedMessage id="%d night" values={{ value: this.props.value }} />
        <Icon type="down" />
      </Button>
    </Dropdown>)
  }
}

function genarateMenus(current = 1, date) {
  let i, array = []
  for (i = 1; i <= MAX_NIGHT; i++) {
    array.push(<Menu.Item key={i} className={`${i === parseInt(current, 10) ? 'active' : ''}`}>
      <FormattedMessage id="%d night" values={{ value: i }} />
      <div className="date">{moment(date).add(i, 'day').startOf('day').format('ll')}</div>
    </Menu.Item>)
  }
  return array
}