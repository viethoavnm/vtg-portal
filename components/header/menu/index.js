import React from 'react';
import { Menu } from 'antd';
import Link from 'components/link';
import { connect } from 'react-redux';
import { RESOURCES_PATH } from 'consts';
import { saveAttemptUrl } from 'utils/url';
import { FormattedMessage } from 'react-intl';
import Router, { withRouter } from 'next/router';
import showWarning from 'components/warning';

const Item = Menu.Item;
const mapState = (state) => ({
  pageInfo: state.info.COMMON
})
export default withRouter(connect(mapState)(class AppMenu extends React.PureComponent {
  menu = MENU_ITEMS.map(({ title, href }) =>
    (<Item key={href}><FormattedMessage id={title} /></Item>))

  onMenuSelect = ({ key }) => {
    switch (key) {
      case '/':
      case '/blogs':
        Router.push(key);
        break;
      default:
        showWarning();
        break;
    }
  }

  render() {
    const { asPath } = this.props.router;
    const selected = asPath.split('?')[0];
    saveAttemptUrl(asPath);
    const { headerLogo } = this.props.pageInfo;
    return (
      <div className="header__menu-wrap">
        <span className="header__logo">
          <Link href="/">
            {headerLogo
              ? <img src={RESOURCES_PATH + headerLogo} alt="spetrip.com" />
              : <h2>SPE<span>TRIP</span></h2>}
          </Link>
        </span>
        <Menu
          onClick={this.onMenuSelect}
          selectedKeys={[selected]}
          mode="horizontal"
          className="header__menu">
          {this.menu}
        </Menu >
      </div>)
  }
}))

const MENU_ITEMS = [
  {
    title: "Hotel",
    href: '/',
    name: 'HOME'
  },
  {
    title: "Rent cars",
    href: '/car',
    name: ''
  },
  {
    title: "Flight tickets",
    href: '/flight',
    name: ''
  },
  {
    title: "Tours",
    href: '/place',
    name: ''
  },
  {
    title: "Voucher",
    href: '/promotions',
    name: ''
  },
  {
    title: "Travel Blog",
    href: '/blogs',
    name: ''
  }
]