import React from 'react'
import Axios from 'axios'
import { Form, Icon, Input, Button, Checkbox } from 'antd'
import { BASE_URL } from 'consts'
import { setToken } from 'utils/auth'
import { injectIntl } from 'react-intl'
import { connect } from 'react-redux'
import Router from 'next/router'
import Head from 'next/head'
import './login.scss'
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
    FB.login(function (response) {
      console.log("res", response)
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

  render() {
    const { getFieldDecorator } = this.props.form
    const { loading, error } = this.props
    const validateStatus = error ? 'error' : loading ? 'validating' : undefined
    return (
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
        <div className="auth__logo">
          <img src="/static/images/logo.png" alt="spetrip logo" />
        </div>
        <Form onSubmit={this.handleSubmit} className="form-login">
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
          <div style={{ textAlign: 'center', marginBottom: 8, fontSize: 12 }}>{this.t('Login or')}</div>
          <div>
            <Button type="primary" icon="facebook" onClick={this.fbLogin} style={{ width: '100%', marginBottom: 8 }}>
              {this.t('Login via Facebook')}
            </Button>
          </div>
          <div>
            <Button type="primary" icon="google" onClick={this.gLogin} style={{ width: '100%', marginBottom: 8 }}>
              {this.t('Login via Google')}
            </Button>
          </div>
          {this.t('Login or')} <a href="/register">{this.t('Register now')}!</a>
        </Form>
      </div>
    )
  }
}

const WrappedNormalLoginForm = Form.create()(NormalLoginForm)

export default injectIntl(connect((state) => ({ isAuth: !!state.user }))(WrappedNormalLoginForm))