import React from 'react'
import Help from './help'
import Notice from './notice'
import Account from './account'
import UserMenu from './user-menu'
import Link from 'components/link'
import LangNCurrency from './language'
import ImageLoader from 'components/image-loader';
import { connect } from 'react-redux'
import { injectIntl } from 'react-intl'
import { RESOURCES_PATH } from 'consts'
import './header.scss'
import '../flag/flag.scss'

/*eslint-disable*/
const Header = ({ isAuthenticated, user, info, intl }) => {
  const t = (id, values) => (intl.formatMessage({ id }, values))
  return (
    <header className="header">
      <div className="container">
        <div className="header__logo">
          <a href="/">
            <ImageLoader
              alt={info.website}
              src={RESOURCES_PATH + info.headerLogo}
            />
          </a>
        </div>
        <ul className="header__menu">
          <li><Link href="/sales">{t('Reseller')}</Link></li>
          <li><Notice t={t} /></li>
          <li><Help t={t} /></li>
          <li><LangNCurrency t={t} /></li>
          {isAuthenticated
            ? (<li className="no-hover"><UserMenu name={user.user_name} /></li>)
            : (<li><Account t={t} /></li>)}
        </ul>
      </div>
    </header>
  )
}

export default injectIntl(connect((state) => ({
  isAuthenticated: state.loggedIn,
  user: state.user,
  info: state.info.COMMON
}))(Header))
