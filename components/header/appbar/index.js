import React from 'react';
import Help from './help';
import Notice from './notice';
import Account from './account';
import LangNCurrency from './language';
import showWarning from 'components/warning';
import { FormattedMessage } from 'react-intl';

/*eslint-disable*/
const Appbar = () => (
  <ul className="header__appbar">
    <li>
      <a onClick={(e) => {
        e.preventDefault();
        showWarning();
      }}>
        <FormattedMessage id="Reseller" />
      </a>
    </li>
    <li><Notice /></li>
    <li><Help /></li>
    <li><LangNCurrency /></li>
    <li><Account /></li>
  </ul>)

export default Appbar;