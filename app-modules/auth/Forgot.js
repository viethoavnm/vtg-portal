import React from 'react';
import Axios from 'axios';
import Link from 'next/link';
import Router from 'next/router';
import { BASE_URL } from 'consts';
import { connect } from 'react-redux';
import { injectIntl, FormattedMessage } from 'react-intl';
import { Form, Input, Button, Modal, Icon } from 'antd';

class RegistrationForm extends React.Component {
  state = { confirmDirty: false, loading: false, agree: false };
  t = (id, values) => (this.props.intl.formatMessage({ id }, values));

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        this.setState({ loading: true })
        Axios.post(BASE_URL + 'api/user/register', values)
          .then(() => {
            this.setState({ loading: false })
            Modal.success({
              title: this.t('Recovery successfully!'),
              content: this.t("Let's check you mailbox to access your account.") + this.t('Press ok to go to login page'),
              okText: 'OK',
              onOk: () => { Router.push('/login') }
            })
          })
      }
    });
  }

  componentDidMount() {
    if (window && this.props.isAuth)
      if (!!window.history.length)
        Router.back()
      else
        Router.push('/')
  }

  emailOption = {
    rules: [
      { type: 'email', message: this.t('The input is not valid E-mail!') },
      { required: true, message: this.t('Please input your E-mail!') }],
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div className="auth-nest container">
        <div className="auth">
          <Form onSubmit={this.handleSubmit}>
            <div className="auth__back">
              <Link href="/login">
                <a>
                  <Icon type="left" />
                  <FormattedMessage id="Back" />
                </a>
              </Link>
            </div>
            <h3 className="auth__title"><FormattedMessage id="Forgot password" /></h3>
            <Form.Item label="E-mail" >
              {getFieldDecorator('email', this.emailOption)(
                <Input placeholder={this.t('Input your E-mail!')} />
              )}
            </Form.Item>
            <Form.Item >
              <Button
                type="primary"
                htmlType="submit"
                loading={this.state.loading}>
                <FormattedMessage id="Recovery" />
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    );
  }
}

const WrappedRegistrationForm = Form.create()(RegistrationForm);
export default injectIntl(connect((state) => ({ isAuth: !!state.user }))(WrappedRegistrationForm))