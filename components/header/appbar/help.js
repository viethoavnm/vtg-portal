import React from 'react';
import Link from 'components/link';
import { Icon, Popover } from 'antd';
import { FormattedMessage } from 'react-intl';

const HelpWindow = () =>
  (<Popover
    trigger="click"
    placement="bottomRight"
    title={<FormattedMessage id="Help" />}
    content={
      (<div className="menu-popover">
        <Link className="menu-popover__item" href="/faq"> <FormattedMessage id="FAQ" /></Link>
        <Link className="menu-popover__item" href="/payment"><FormattedMessage id="Payment method" /></Link>
        <Link className="menu-popover__item" href="/policy"><FormattedMessage id="Reseller policy" /></Link>
        <Link className="menu-popover__item" href="/contact"><FormattedMessage id="Contact %s" values={{ value: 'spetrip.com' }} /></Link>
        <span className="menu-popover__item" ><FormattedMessage id="Hotline" />: <Link>19008198</Link></span>
      </div>)}>
    <FormattedMessage id='Help' />
    <Icon type="caret-down" />
  </Popover>)
export default HelpWindow;
