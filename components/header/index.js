import React from 'react';
import AppMenu from './menu';
import Appbar from './appbar';

export default class Header extends React.Component {
  render() {
    return (
      <div className="header">
        <div className="container header--desktop">
          <Appbar />
          <AppMenu />
        </div>
        <div className="header--mobile">
        </div>
      </div>)
  }
}