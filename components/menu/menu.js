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
    title: "HOTEL",
    href: '/hotel',
    name: 'HOME'
  },
  {
    title: "TRAVEL_TRANSPORT",
    href: '/car',
    name: ''
  },
  {
    title: "FLIGHT_TICKET",
    href: '/flight',
    name: ''
  },
  {
    title: "PLACE",
    href: '/place',
    name: ''
  },
  {
    title: "PROMOTION",
    href: '/promotions',
    name: ''
  },
  {
    title: "BLOG",
    href: '/blogs',
    name: 'BLOG'
  }
]

export default injectIntl(Menu)