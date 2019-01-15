import React from 'react';
import { Button, Icon, Popover } from 'antd';
import { FormattedMessage } from 'react-intl';

export default class LangNCurrency extends React.PureComponent {
  state = { visible: false }

  hide = () => {
    this.setState({
      visible: false,
    })
  }

  handleVisibleChange = (visible) => {
    this.setState({ visible })
  }

  render = () => (
    <Popover
      visible={this.state.visible}
      onVisibleChange={this.handleVisibleChange}
      content={
        <div className="languages">
          <ul className="language">
            <span className="languages__title">
              <FormattedMessage id="Language" />
            </span>
            <li><span className="language__flag flag vn" />Tiếng Việt</li>
            <li><span className="language__flag flag sg" />Tiếng Anh</li>
          </ul>
          <ul className="currency">
            <span className="languages__title">
              <FormattedMessage id="Currency" />
            </span>
            <li>
              <span className="currency__token">VND</span>
              <span className="currency__name">Việt Nam Đồng</span>
            </li>
            <li>
              <span className="currency__token">USD</span>
              <span className="currency__name">Dollar Mỹ</span>
            </li>
            <li className="currency__btn">
              <Button type="primary" onClick={this.hide}>
                <FormattedMessage id="Done" />
              </Button>
            </li>
          </ul>
        </div>
      }
      trigger="click"
      placement="bottomRight"
      title={<FormattedMessage id="Change language and currency" />}>
      <div className="header__item">
        <span className="flag vn" style={{ marginRight: 6 }} />
        <span>VND</span>
        <Icon type="caret-down" />
      </div>
    </Popover >
  )
}
