import React from 'react';
import { FormattedMessage, FormattedNumber } from 'react-intl';

const UserRating = () => (
  <div className="user-rating">
    <div className="row">
      <div className="col-12 label">
        <FormattedMessage id="USER_RATING" />
      </div>
    </div>
    <br />
    <div className="row">
      <div className="col-12">
        <Comment />
        <Comment />
        <Comment />
        <Comment />
        <Comment />
      </div>
    </div>
  </div>
)
const Comment = () => (
  <div className="comment">
    <div>
      <span className="comment__score">
        <FormattedNumber
          value={Math.floor((Math.random() * 21) + 80) / 10}
          minimumFractionDigits={1}
          maximumFractionDigits={1}
        />
      </span>
    </div>
    <div>
      <div>
        <span className="comment__name">Trần Việt Hòa</span>
        <span className="comment__date">Th7 ngày 20/10/2018</span>
      </div>
      <p>
        Tivi hàng chính hãng, hình ảnh rất đẹp và đặc biệt là âm thanh của tivi rất hay, tương đương với sound bar Sony HT-CT390 có sẵn của mình. Hàng to cồng kềnh nhưng dmx đóng gói và giao rất cẩn thận. Lắp đặt dễ dàng trơn tru, rất thích cách làm việc của DMX.
      </p>
    </div>
  </div>
);
export default UserRating;