import React from 'react';
import Link from 'components/link';
import { Avatar, Icon, Popover } from 'antd';
import { FormattedMessage } from 'react-intl';


const UserMenu = ({ user, requestLogout }) => {
  const onLogout = (e) => {
    e.preventDefault();
    requestLogout();
  }

  return (
    <Popover
      content={
        <div className="menu-popover">
          <Link className="menu-popover__item" href="/order"><Icon type="schedule" /><FormattedMessage id="Order management" /></Link>
          <Link className="menu-popover__item" href="/user-info"><Icon type="user" /><FormattedMessage id="User information" /></Link>
          <Link className="menu-popover__item" href="/logout" onClick={onLogout}><Icon type="logout" /><FormattedMessage id="Logout" /></Link>
        </div>
      }
      trigger="click"
      placement="bottomRight"
      title={<FormattedMessage id="User information" />}>
      <div className="avatar-box">
        <span className="header__text">{user['user_name']}</span>
        <Avatar icon="user" size="small" />
      </div>
    </Popover>
  )
}
export default UserMenu;