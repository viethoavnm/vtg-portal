import React from 'react';
import Help from './help';
import Notice from './notice';
import Account from './account';
import Link from 'components/link';
import { FormattedMessage } from 'react-intl';
import LangNCurrency from './language';

/*eslint-disable*/
const Appbar = () => (
  <ul className="header__appbar">
    <li>
      <Link href="/sales" ><FormattedMessage id="Reseller" /></Link>
    </li>
    <li><Notice /></li>
    <li><Help /></li>
    <li><LangNCurrency /></li>
    <li><Account /></li>
  </ul>)

export default Appbar;