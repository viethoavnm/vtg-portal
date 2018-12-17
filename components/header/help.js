import React from 'react'
import { Icon, Popover } from 'antd'

const HelpWindow = ({ t }) => (
  <Popover
    trigger="click"
    placement="bottomRight"
    title={t('Help')}
    content={
      (<ul className="menu-popover">
        <li><a href="/">Những câu hỏi thường gặp</a></li>
        <li><a href="/">Chính sách thanh toán</a></li>
        <li><a href="/">Chính sách bán hàng</a></li>
        <li><a href="/">Liên hệ spetrip.com</a></li>
        <li>Hotline: 19001008</li>
      </ul>)}>
    {t('Help')}
    <Icon type="caret-down" style={{ marginLeft: 4 }} />
  </Popover>
)
export default HelpWindow
