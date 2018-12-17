import React from 'react'
import Router from 'next/router'
import { unsetToken } from 'utils/auth'

export default class Register extends React.Component {
  componentDidMount() {
    unsetToken()
    Router.back()
  }
  render() {
    return null
  }
}