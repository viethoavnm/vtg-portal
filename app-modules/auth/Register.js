import React from 'react';
import Axios from 'axios';
import Router from 'next/router';
import { BASE_URL } from 'consts';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import { Form, Input, Checkbox, Button, Modal } from 'antd';
import './Login.scss';

class RegistrationForm extends React.Component {
  state = { confirmDirty: false, loading: false, agree: false };

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        this.setState({ loading: true })
        Axios.post(BASE_URL + 'api/user/register', values)
          .then(() => {
            this.setState({ loading: false })
            Modal.success({
              title: 'Register successfully!',
              content: 'Press ok to go to login page',
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
      callback('Two passwords that you enter is inconsistent!');
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
      { type: 'email', message: 'The input is not valid E-mail!' },
      { required: true, message: 'Please input your E-mail!' }],
  }

  passwordOption = {
    rules: [{
      required: true, message: 'Please input your password!', whitespace: false
    }, {
      validator: this.validateToNextPassword,
    }],
  }

  confirmOption = {
    rules: [{
      required: true, message: 'Please confirm your password!',
    }, {
      validator: this.compareToFirstPassword,
    }],
  }

  nameOption = {
    rules: [{ required: true, message: 'Please input your name!', whitespace: true }],
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div className="auth">
        <div className="auth__logo">
          <a href="/"><img src="/static/images/logo.png" alt="spetrip logo" /></a>
        </div>
        <Form onSubmit={this.handleSubmit}>
          <Form.Item {...formItemLayout} label="E-mail" >
            {getFieldDecorator('email', this.emailOption)(
              <Input />
            )}
          </Form.Item>
          <Form.Item  {...formItemLayout} label={"Username"}>
            {getFieldDecorator('username', this.nameOption)(
              <Input />
            )}
          </Form.Item>
          <Form.Item
            {...formItemLayout}
            label="Password" >
            {getFieldDecorator('password', this.passwordOption)(
              <Input type="password" />
            )}
          </Form.Item>
          <Form.Item
            {...formItemLayout}
            label="Confirm Password"  >
            {getFieldDecorator('confirm', this.confirmOption)(
              <Input type="password" onBlur={this.handleConfirmBlur} />
            )}
          </Form.Item>
          <Form.Item  {...formItemLayout} label={"Name"}>
            {getFieldDecorator('name', this.nameOption)(
              <Input />
            )}
          </Form.Item>
          <Form.Item {...tailFormItemLayout}>
            <Checkbox onChange={this.onCheckboxChange}>I have read the <a href="">agreement</a></Checkbox>
          </Form.Item>
          <Form.Item {...tailFormItemLayout}>
            <Button type="primary"
              htmlType="submit"
              loading={this.state.loading}
              disabled={!this.state.agree}>Register</Button>
          </Form.Item>
        </Form>
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