import React from 'react'
import { Icon, Popover } from 'antd'

const AccountWindow = ({ t }) => (
  <Popover
    trigger="click"
    placement="bottomRight"
    title={t('Account')}
    content={
      (<ul className="menu-popover">
        <li><a href="/login">{t('Login')}</a></li>
        <li><a href="/login">{t('Register')}</a></li>
      </ul>)}>
    {t('Account')}
    <Icon type="caret-down" style={{ marginLeft: 4 }} />
  </Popover>
)
export default AccountWindow
