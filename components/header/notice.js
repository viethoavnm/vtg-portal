import React from 'react'
import { Badge, Popover, Icon } from 'antd'

const NoticeWindow = ({ t }) => (
  <Popover
    trigger="click"
    placement="bottomRight"
    title={t('Notice')}
    content={
      (<div />)
    }
  >
    <Badge dot count={0}>
      {t('Notice')}
    </Badge>
    <Icon type="caret-down" style={{ marginLeft: 4 }} />
  </Popover>
)
export default NoticeWindow
