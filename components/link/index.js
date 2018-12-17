import React from 'react'

export default class Link extends React.PureComponent {
  goto = () => {
    console.log("#goto:", this.props.href)
  }
  render() {
    const { className, href, style, title, children } = this.props
    const aProps = { className, href, style, title }
    return (<a {...aProps} onClick={this.goto}>{children}</a>)
  }
}