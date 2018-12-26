import React from 'react'
import Link from 'components/link'
import { injectIntl } from 'react-intl';
import './menu.scss'

class Menu extends React.PureComponent {
  render() {
    return (
      <nav id="navbar" className="menu">
        <div className="container">
          <ul className="menu__wide">
            {MENU_ITEMS.map(({ title, href }, index) => {
              const actived = href === '/blogs'
              return (
                <li key={index.toString()} className={`${actived ? 'active' : ''}`}>
                  <Link href={href}>
                    {this.props.intl.formatMessage({ id: title })}
                  </Link>
                </li>
              )
            })}
          </ul>
        </div>
      </nav>)
  }
}

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

export default injectIntl(Menu)