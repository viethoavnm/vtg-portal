import React from 'react';
import { FormattedMessage } from 'react-intl';

const AboutHotel = () => (
  <div className="about-hotel">
    <div className="row">
      <div className="col-12 label">
        <FormattedMessage id="ABOUT_HOTEL" />
      </div>
    </div>
    <div className="row">
      <div className="col-12">
        <p className="box">
          Sofitel Hotels & Resorts là một chuỗi các khách sạn sang trọng có trụ sở tại Paris, Pháp và thuộc sở hữu của AccorHotels từ năm 1980. Được thành lập vào năm 1964 tại Pháp, Sofitel nhanh chóng phát triển trên toàn thế giới để tiếp cận hơn 200 khách sạn...
        </p>
      </div>
    </div>
  </div>
)

export default AboutHotel;