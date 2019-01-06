import React from 'react'
import Axios from 'axios'
import { Form, Icon, Input, Button, Checkbox } from 'antd'
import { BASE_URL } from 'consts'
import { setToken } from 'utils/auth'
import { injectIntl } from 'react-intl'
import { connect } from 'react-redux'
import Router from 'next/router'
import Head from 'next/head'
import './Login.scss'
import {
  FB_APP_ID,
  G_APP_ID
} from 'consts'

const FormItem = Form.Item

class NormalLoginForm extends React.Component {
  componentDidMount() {
    if (window && this.props.isAuth)
      if (!!window.history.length)
        Router.back()
      else
        Router.push('/')
  }
  state = { loading: false }

  handleSubmit = (e) => {
    e.preventDefault()
    this.props.form.validateFields((err, { username, password }) => {
      if (!err) {
        this.setState({ loading: true })
        Axios.post(
          BASE_URL + 'oauth/token',
          `username=${username}&password=${password}&grant_type=password`,
          {
            headers: {
              'Authorization': 'Basic Zm9vQ2xpZW50SWRQYXNzd29yZDpzZWNyZXQ=',
              'Content-type': 'application/x-www-form-urlencoded'
            }
          })
          .then(({ data }) => {
            this.setState({ loading: false })
            setToken(data.access_token)
            if (!!window.history.length)
              Router.back()
            else
              Router.push('/')
          })
          .catch(() => {
            this.setState({ loading: false })
            this.props.form.setFields({
              username: { value: username, errors: [new Error(this.t('Username invalid'))] },
              password: { value: password, errors: [new Error(this.t('Password invalid'))] }
            })
          })
      }
    })
  }

  t = (id) => (this.props.intl.formatMessage({ id }))

  fbLogin = () => {
    FB.login(({ authResponse: { accessToken } }) => {
      FB.api('/me', (response) => {
        this.socialLogin({
          accessToken,
          username: response.name,
          email: response.value
        })
        console.log('Good to see you, ' + response.name + '.' + ' Email: ' + response.email + ' Facebook ID: ' + response.id);
      });
    }, {
        scope: 'email',
        return_scopes: true
      });
  }

  gLogin = () => {
    auth2.grantOfflineAccess()
      .then((response) => {
        console.log("res", response)
      });
  }

  socialLogin = (data) => {
    Axios.post(BASE_URL + 'api/user/facebook-login', data)
      .then(({ data: { value } }) => {
        this.setState({ loading: false })
        setToken(value.access_token)
        if (!!window.history.length)
          Router.back()
        else
          Router.push('/')
      })
  }

  render() {
    const { getFieldDecorator } = this.props.form
    const { loading, error } = this.props
    const validateStatus = error ? 'error' : loading ? 'validating' : undefined
    return (
      <div className="auth-nest container">
        <div className="auth">
          <Head>
            <script>{`
            (function(d, s, id) {
              var js, fjs = d.getElementsByTagName(s)[0];
              if (d.getElementById(id)) return;
              js = d.createElement(s); js.id = id;
              js.src = 'https://connect.facebook.net/vi_VN/sdk.js#xfbml=1&version=v3.2&appId=${FB_APP_ID}&autoLogAppEvents=1';
              fjs.parentNode.insertBefore(js, fjs);
            }(document, 'script', 'facebook-jssdk'));`}
            </script>
            <script>{`
             function start() {
              gapi.load('auth2', function() {
                auth2 = gapi.auth2.init({
                  client_id: '${G_APP_ID}.apps.googleusercontent.com'
                });
              });
            }`}
            </script>
            <script src="https://apis.google.com/js/client:platform.js?onload=start" async defer></script>
          </Head>
          <Form onSubmit={this.handleSubmit} className="form-login">
            <div className="auth__logo">
              <a href="/"><img src="/static/images/logo.png" alt="spetrip logo" /></a>
            </div>
            <FormItem validateStatus={validateStatus}>
              {getFieldDecorator('username', {
                rules: [{ required: true, message: this.t('Username invalid') }],
              })(
                <Input prefix={<Icon type="user" />} placeholder={this.t('Username')} />
              )}
            </FormItem>
            <FormItem validateStatus={validateStatus}>
              {getFieldDecorator('password', {
                rules: [{ required: true, message: this.t('Password invalid') }],
              })(
                <Input prefix={<Icon type="lock" />} type="password" placeholder={this.t('Password')} />
              )}
            </FormItem>
            <FormItem>
              {getFieldDecorator('remember', {
                valuePropName: 'checked',
                initialValue: true,
              })(
                <Checkbox>{this.t('Remember me')}</Checkbox>
              )}
              <a className="form-login__forgot" href="/forgot">{this.t('Forgot password')}</a>
            </FormItem>
            <Button type="primary" htmlType="submit" className="form-login__btn-login" loading={this.state.loading}>
              {this.t('Login')}
            </Button>
            <div className="auth__spr">{this.t('Login or')}</div>
            <div className="auth__social">
              <div className="social-btn social-btn--fb" onClick={this.fbLogin}>
                <Icon type="facebook" theme="filled" />
              </div>
              <div className="social-btn social-btn--gp" onClick={this.gLogin}>
                <Icon type="google" />
              </div>
            </div>
            {this.t('Login or')} <a href="/register">{this.t('Register now')}!</a>
          </Form>
        </div>
      </div>
    )
  }
}

const WrappedNormalLoginForm = Form.create()(NormalLoginForm)

export default injectIntl(connect((state) => ({ isAuth: !!state.user }))(WrappedNormalLoginForm))