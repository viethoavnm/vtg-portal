import React from 'react';
import { FormattedMessage } from 'react-intl';

const HotelPolicy = () => (
  <div className="hotel-policy">
    <div className="row">
      <div className="col-12 label">
        <FormattedMessage id="HOTEL_POLICY" />
      </div>
    </div>
    <div className="row">
      <div className="col-12">
        <div className="box">
          <ul>
            <li>Nhận phòng lúc 14h</li>
            <li>Trả phòng lúc 12h</li>
            <li>Không được nuôi mèo</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
)

export default HotelPolicy;