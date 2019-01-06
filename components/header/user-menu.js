import React from 'react';
import { connect } from 'react-redux';
import { requestLogout } from 'utils/redux';
import { FormattedMessage } from 'react-intl';
import { Avatar, Icon, Popover } from 'antd';


const UserMenu = ({ name, requestLogout }) => {
  const onLogout = (e) => {
    e.preventDefault();
    requestLogout();
  }

  return (
    <Popover
      content={
        <ul className="menu-popover">
          <li>
            <a href="/order"><Icon type="schedule" /><FormattedMessage id="Order management" /></a>
          </li>
          <li>
            <a href="/user-info"><Icon type="user" /><FormattedMessage id="User information" /></a>
          </li>
          <li>
            <a href="/logout" onClick={onLogout}><Icon type="logout" /><FormattedMessage id="Logout" /></a>
          </li>
        </ul >
      }
      trigger="click"
      placement="bottomRight"
      title={<FormattedMessage id="User information" />}
    >
      <span className="header__text">{name}</span>
      <Avatar icon="user" size="small" style={{ marginLeft: 4 }} />
    </Popover>
  )
}
export default connect(null, { requestLogout })(UserMenu);