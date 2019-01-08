import React from 'react';
import Link from 'components/link';
import UserMenu from './user-menu';
import { Icon, Popover } from 'antd';
import { connect } from 'react-redux';
import { requestLogout } from 'utils/redux';
import { FormattedMessage } from 'react-intl';

const AccountWindow = ({ loggedIn, user, requestLogout }) => {
  if (loggedIn)
    return <UserMenu user={user} requestLogout={requestLogout} />
  return (<Popover
    trigger="click"
    placement="bottomRight"
    title={<FormattedMessage id="Account" />}
    content={
      (<div className="menu-popover">
        <Link className="menu-popover__item" href="/login"><FormattedMessage id="Login" /></Link>
        <Link className="menu-popover__item" href="/register"><FormattedMessage id="Register" /></Link>
      </div>)
    }>
    <FormattedMessage id="Account" />
    < Icon type="caret-down" />
  </Popover >)
}
export default connect((state) => ({ loggedIn: state.loggedIn, user: state.user }), { requestLogout })(AccountWindow);
