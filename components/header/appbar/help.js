import React from 'react';
import Link from 'components/link';
import { Icon, Popover } from 'antd';
import showWarning from 'components/warning';
import { FormattedMessage } from 'react-intl';

const onClick = (e) => {
  e.preventDefault();
  showWarning();
}

const HelpWindow = () =>
  (<Popover
    trigger="click"
    placement="bottomRight"
    title={<FormattedMessage id="Help" />}
    content={
      (<div className="menu-popover">
        <a className="menu-popover__item" onClick={onClick} href="/faq"><FormattedMessage id="FAQ" /></a>
        <a className="menu-popover__item" onClick={onClick} href="/payment"><FormattedMessage id="Payment method" /></a>
        <a className="menu-popover__item" onClick={onClick} href="/policy"><FormattedMessage id="Reseller policy" /></a>
        <a className="menu-popover__item" onClick={onClick} href="/contact"><FormattedMessage id="Contact %s" values={{ value: 'spetrip.com' }} /></a>
        <span className="menu-popover__item" ><FormattedMessage id="Hotline" />: <Link>19008198</Link></span>
      </div>)}>
    <FormattedMessage id='Help' />
    <Icon type="caret-down" />
  </Popover>)
export default HelpWindow;
