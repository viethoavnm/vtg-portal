import React from 'react';
import { FormattedMessage } from 'react-intl';
import * as constants from './HotelConstant';

const Sortbar = ({ actived = constants.SORT_BY_SUGGEST }) => (
  <div className="sort-bar d-flex justify-content-between">
    <span className={`${actived === constants.SORT_BY_SUGGEST ? 'actived' : ''}`}><FormattedMessage id="Sort by suggestion" /></span>
    <span className={`${actived === constants.SORT_BY_PRICE_DOWN ? 'actived' : ''}`}><FormattedMessage id="Price asc" /></span>
    <span className={`${actived === constants.SORT_BY_PRICE_UP ? 'actived' : ''}`}><FormattedMessage id="Price desc" /></span>
    <span className={`${actived === constants.SORT_BY_RANKING ? 'actived' : ''}`}><FormattedMessage id="High rating" /></span>
    <span className={`${actived === constants.SORT_BY_PROMOTE ? 'actived' : ''}`}><FormattedMessage id="Promotion" /></span>
  </div >
)

export default Sortbar;