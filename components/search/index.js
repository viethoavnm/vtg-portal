import React from 'react'
import moment from 'moment'
import Search from './search'
import { injectIntl } from 'react-intl'
import './search.scss'

const defaultState = {
  searchText: '',
  startDate: moment(),
  returnDate: moment().add(1, 'day'),
  night: 1,
  roomNGuest: {
    room: 1,
    guest: 2
  }
}

class SearchWrapper extends React.Component {
  constructor(props) {
    super(props)
    const query = {}
    this.state = {
      backdrop: false,
      startDate: query.stateDate || defaultState.startDate,
      returnDate: query.returnDate || defaultState.returnDate,
      roomNGuest: query.roomNGuest || defaultState.roomNGuest,
      night: Number(query.night) || defaultState.night,
      showChooseRoom: false
    }
  }

  onChange = (key, value) => {
    if (key === 'startDate') {
      this.setState({
        startDate: value,
        returnDate: moment(value).add(this.state.night, 'day')
      })
      return
    }
    if (key === 'returnDate') {
      if (value.diff(this.state.startDate, 'days') <= 0) {
        if (moment(value).subtract(this.state.night, 'day').diff(moment(), 'days') >= 0) {
          this.setState({ startDate: moment(value).subtract(this.state.night, 'day') })
        } else {
          this.setState({
            startDate: moment(value).subtract(1, 'day'),
            night: 1
          })
        }
      } else {
        this.setState({ night: value.diff(this.state.startDate, 'days') })
      }
    }
    if (key === 'night') {
      this.setState({
        night: value,
        returnDate: moment(this.state.startDate).add(value, 'day')
      })
      return
    }
    if (key === 'roomNGuest') {
      this.setState({ showChooseRoom: false })
    }
    this.setState({ [key]: value })
  }

  onSearch = () => {
    if (this.props.onSearch) {
      this.props.onSearch({
        night: this.state.night,
        room: this.state.roomNGuest.room,
        guest: this.state.roomNGuest.guest,
        startDate: this.state.startDate.format('DDMMYYYY'),
        searchText: this.state.searchText
      })
    }
  }

  handleRoomPopover = (value) => {
    this.setState({ showChooseRoom: value })
  }


  showBackdrop = () => {
    this.setState({ backdrop: true })
  }

  t = (id, values) => (this.props.intl.formatMessage({ id }, values))

  render() {
    const actions = {
      onChange: this.onChange,
      onSearch: this.onSearch,
      onFocus: this.showBackdrop,
      handleRoomPopover: this.handleRoomPopover
    }
    return (
      <Search
        t={this.t}
        vertical={this.props.vertical}
        actions={actions}
        data={this.state}
        backdrop={this.state.backdrop}
      />)

  }
}

export default injectIntl(SearchWrapper)