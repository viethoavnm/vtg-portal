import React from 'react'
import { Button } from 'antd'

const Banner = () =>
  (<div className="advertisement">
    <div className="left">
      <div className="background">
        <div className="transform" />
      </div>
      <h4>Đặt phòng trên spetrip.com?</h4>
      <ul>
        <li>Rẻ nhất, giá gốc khách sạn</li>
        <li>Có tất cả loại chỗ nghỉ</li>
        <li>Hỗ trợ 24/7</li>
      </ul>
      <Button type="primary">Tìm hiểu thêm</Button>
    </div>
    <div className="right">
      <div className="background">
        <div className="transform" />
      </div>
      <h4>Bán phòng trên spetrip.com?</h4>
      <ul>
        <li>Tăng doanh thu 30%</li>
        <li>Chủ động kinh doanh</li>
        <li>Hỗ trợ 24/7</li>
      </ul>
      <Button type="primary">Đăng ký ngay</Button>
    </div>
  </div>)

export default Banner