import React from 'react';
import { Popover, Icon } from 'antd';
import { FormattedMessage } from 'react-intl';

const NoticeWindow = () => (
  <Popover
    trigger="click"
    placement="bottomRight"
    title={<FormattedMessage id="Notice" />}
    content={(<div />)}>
    <FormattedMessage id="Notice" />
    <Icon type="caret-down" />
  </Popover>
)
export default NoticeWindow;
