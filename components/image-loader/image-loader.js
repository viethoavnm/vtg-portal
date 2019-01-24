import React from 'react'
import { Skeleton } from 'antd'

const Status = {
  PENDING: 'PENDING',
  LOADING: 'LOADING',
  LOADED: 'LOADED',
  FAILED: 'FAILED',
}


export default class ImageLoader extends React.Component {

  constructor(props) {
    super(props)
    this.state = { status: props.src ? Status.LOADING : Status.PENDING }
  }

  componentDidMount() {
    if (this.state.status === Status.LOADING) {
      this.createLoader()
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.src !== nextProps.src) {
      this.setState({
        status: nextProps.src ? Status.LOADING : Status.PENDING,
      })
    }
  }

  componentDidUpdate() {
    if (this.state.status === Status.LOADING && !this.img) {
      this.createLoader()
    }
  }

  componentWillUnmount() {
    this.destroyLoader()
  }

  createLoader() {
    this.destroyLoader()
    this.img = new Image()
    this.img.onload = this.handleLoad
    this.img.onerror = this.handleError
    this.img.src = this.props.src
  }

  destroyLoader() {
    if (this.img) {
      this.img.src = ''
      this.img.onload = null
      this.img.onerror = null
      this.img = null
    }
  }

  handleLoad = (event) => {
    this.destroyLoader()
    this.setState({ status: Status.LOADED })
    if (this.props.onLoad) this.props.onLoad(event)
  }

  handleError = (error) => {
    this.destroyLoader()
    this.setState({ status: Status.FAILED })
    if (this.props.onError) this.props.onError(error)
  }

  render() {
    switch (this.state.status) {
      case Status.LOADED:
        /* eslint-disable */
        return <img {...this.props} />
      case Status.FAILED:
        return <img {...this.props} src="/static/images/hotel-default.jpg"/>
      default:
        return <div className={this.props.className}><Skeleton active /></div>
    }
  }
}