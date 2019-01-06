import React from 'react';
import Axios from 'axios';
import Link from 'next/link';
import Router from 'next/router';
import { BASE_URL } from 'consts';
import { connect } from 'react-redux';
import { injectIntl, FormattedMessage } from 'react-intl';
import { Form, Input, Checkbox, Button, Modal, Icon } from 'antd';
import './Login.scss';

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
              title: this.t('Register successfully!'),
              content: this.t('Press ok to go to login page'),
              okText: 'OK',
              onOk: () => { Router.push('/login') }
            })
          })
      }
    });
  }

  handleConfirmBlur = (e) => {
    const value = e.target.value;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  }

  compareToFirstPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && value !== form.getFieldValue('password')) {
      callback(this.t('Two passwords that you enter is inconsistent!'));
    } else {
      callback();
    }
  }

  validateToNextPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && this.state.confirmDirty) {
      form.validateFields(['confirm'], { force: true });
    }
    callback();
  }

  onCheckboxChange = (e) => {
    this.setState({ agree: e.target.checked })
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

  passwordOption = {
    rules: [{
      required: true, message: this.t('Please input your password!'), whitespace: false
    }, {
      validator: this.validateToNextPassword,
    }],
  }

  confirmOption = {
    rules: [{
      required: true, message: this.t('Please confirm your password!'),
    }, {
      validator: this.compareToFirstPassword,
    }],
  }

  nameOption = {
    rules: [{ required: true, message: this.t('Please input your username!'), whitespace: true }],
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div className="auth-nest container">
        <div className="auth auth--reg">
          <Form onSubmit={this.handleSubmit}>
            <div className="auth__back">
              <Link href="/login">
                <a>
                  <Icon type="left" />
                  <FormattedMessage id="Back" />
                </a>
              </Link>
            </div>
            <h3 className="auth__title"><FormattedMessage id="Register" /></h3>
            <Form.Item {...formItemLayout} label="E-mail" >
              {getFieldDecorator('email', this.emailOption)(
                <Input placeholder={this.t('Input your E-mail!')} />
              )}
            </Form.Item>
            <Form.Item  {...formItemLayout} label={this.t("Username")}>
              {getFieldDecorator('username', this.nameOption)(
                <Input placeholder={this.t('Input your username!')} />
              )}
            </Form.Item>
            <Form.Item
              {...formItemLayout}
              label={this.t("Password")} >
              {getFieldDecorator('password', this.passwordOption)(
                <Input type="password" placeholder={this.t('Input your password!')} />
              )}
            </Form.Item>
            <Form.Item
              {...formItemLayout}
              label={this.t("Confirm password")}  >
              {getFieldDecorator('confirm', this.confirmOption)(
                <Input type="password" onBlur={this.handleConfirmBlur} placeholder={this.t('Input confirm your password!')} />
              )}
            </Form.Item>
            <Form.Item  {...formItemLayout} label={this.t('Fullname')}>
              {getFieldDecorator('name', this.nameOption)(
                <Input placeholder={this.t('Input your name!')} />
              )}
            </Form.Item>
            <Form.Item {...tailFormItemLayout}>
              <Checkbox onChange={this.onCheckboxChange}><FormattedMessage id="I have read the" /> <a href=""><FormattedMessage id="agreement" /></a></Checkbox>
            </Form.Item>
            <Form.Item {...tailFormItemLayout}>
              <Button
                type="primary"
                htmlType="submit"
                loading={this.state.loading}
                disabled={!this.state.agree}>
                <FormattedMessage id="Register now" />
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    );
  }
}

const WrappedRegistrationForm = Form.create()(RegistrationForm);
const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};
export default injectIntl(connect((state) => ({ isAuth: !!state.user }))(WrappedRegistrationForm))