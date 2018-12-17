import React from 'react'
import { Button, InputNumber, message } from 'antd'
import { FormattedMessage } from 'react-intl';

class Selector extends React.Component {
  state = { guest: this.props.values.guest, room: this.props.values.room }
  onChange = (key) => (value) => {
    if ((key === 'room' && value > this.state.guest) || (key === 'guest' && value < this.state.room)) {
      message.warning('ROOM_AND_GUEST_REQUIRED')
      return
    }
    this.setState({ [key]: value })
  }

  onDown = (key) => () => {
    if ((key === 'room' && this.state.room - 1 > this.state.guest) || (key === 'guest' && this.state.guest - 1 < this.state.room)) {
      message.warning('ROOM_AND_GUEST_REQUIRED')
      return
    }
    if (this.state[key] > 1) {
      this.setState({ [key]: this.state[key] - 1 })
    }
  }

  onUp = (key) => () => {
    if ((key === 'room' && this.state.room + 1 > this.state.guest) || (key === 'guest' && this.state.guest + 1 < this.state.room)) {
      message.warning('ROOM_AND_GUEST_REQUIRED')
      return
    }
    if (this.state[key] < 100) {
      this.setState({ [key]: this.state[key] + 1 })
    }
  }

  onDone = () => {
    if (this.props.onDone) {
      this.props.onDone({ ...this.state })
    }
  }

  render = () =>
    (<div className="room-and-customer">
      <div className="title">
        <FormattedMessage id="Choose room n guest number" />
      </div>
      <div className="row">
        <div className="col-4"><FormattedMessage id="Room amount" /></div>
        <div className="col-8">
          <Button className="btn-left" onClick={this.onDown('room')}>-</Button>
          <InputNumber className="input" min={1} value={this.state.room} onChange={this.onChange('room')} />
          <Button className="btn-right" onClick={this.onUp('room')}>+</Button>
        </div>
      </div>
      <div className="row">
        <div className="col-4"><FormattedMessage id="Guest amount" /></div>
        <div className="col-8">
          <Button className="btn-left" onClick={this.onDown('guest')}>-</Button>
          <InputNumber className="input" min={1} value={this.state.guest} onChange={this.onChange('guest')} />
          <Button className="btn-right" onClick={this.onUp('guest')}>+</Button>
        </div>
      </div>
      <div className="row">
        <div className="col-6" />
        <div className="col-6">
          <Button type="primary" onClick={this.onDone}><FormattedMessage id="Done" /></Button>
        </div>
      </div>
    </div>)
}

export default Selector