import React from 'react';
import { Menu } from 'antd';
import Link from 'components/link';
import { saveAttemptUrl } from 'utils/url';
import { FormattedMessage } from 'react-intl';
import Router, { withRouter } from 'next/router';
import showWarning from 'components/warning';

const Item = Menu.Item;

export default withRouter(class AppMenu extends React.PureComponent {
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
    return (
      <div className="header__menu-wrap">
        <span className="header__logo">
          <Link href="/">
            <h2>SPE<span>TRIP</span></h2>
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
})

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