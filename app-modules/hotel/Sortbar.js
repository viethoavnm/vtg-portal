import React from 'react';
import { FormattedMessage } from 'react-intl';
import * as constants from './HotelConstant';

const Sortbar = ({ actived = constants.SORT_BY_SUGGEST }) => (
  <div className="sort-bar d-flex justify-content-between">
    <span className={`${actived === constants.SORT_BY_SUGGEST ? 'actived' : ''}`}><FormattedMessage id="MY_SUGGEST" /></span>
    <span className={`${actived === constants.SORT_BY_PRICE_DOWN ? 'actived' : ''}`}><FormattedMessage id="SORT_BY_PRICE_DOWN" /></span>
    <span className={`${actived === constants.SORT_BY_PRICE_UP ? 'actived' : ''}`}><FormattedMessage id="SORT_BY_PRICE_UP" /></span>
    <span className={`${actived === constants.SORT_BY_RANKING ? 'actived' : ''}`}><FormattedMessage id="SORT_BY_RANKING" /></span>
    <span className={`${actived === constants.SORT_BY_PROMOTE ? 'actived' : ''}`}><FormattedMessage id="SORT_BY_PROMOTE" /></span>
  </div >
)

export default Sortbar;