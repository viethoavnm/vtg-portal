import React from 'react'
import { FormattedMessage } from 'react-intl'
import { Avatar, Icon, Popover } from 'antd'

const Menu =
  (
    <ul className="menu-popover">
      <li>
        <a href="/order"><Icon type="schedule" /><FormattedMessage id="Order management" /></a>
      </li>
      <li>
        <a href="/user-info"><Icon type="user" /><FormattedMessage id="User information" /></a>
      </li>
      <li>
        <a href="/logout"><Icon type="logout" /><FormattedMessage id="Logout" /></a>
      </li>
    </ul >
  )

const UserMenu = ({ name }) => (
  <Popover
    content={Menu}
    trigger="click"
    placement="bottomRight"
    title={<FormattedMessage id="User information" />}
  >
    <span className="header__text">{name}</span>
    <Avatar icon="user" size="small" style={{ marginLeft: 4 }} />
  </Popover>
)
export default UserMenu