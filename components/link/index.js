import React from 'react';
import Router from 'next/router';

export default class Link extends React.PureComponent {
  goto = () => {
    Router.push(this.props.href);
  }
  render() {
    const { className, href, style, title, children } = this.props
    const aProps = { className, href, style, title }
    return (<a {...aProps} onClick={this.goto}>{children}</a>)
  }
}