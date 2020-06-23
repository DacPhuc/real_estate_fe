import { Button, Col, Form, Input, Checkbox, Icon } from 'antd';
import React, { Component } from 'react';
import Link from 'umi/link';
import { connect } from 'dva';
import styles from './index.less';

@Form.create()
class FormLogin extends Component {
  handleSubmit = () => {
    const { form, dispatch, handleLogin } = this.props;
    form.validateFieldsAndScroll((err, values) => {
      if (err) {
        return false;
      }
      handleLogin(values);
    });
  };

  render() {
    const { form } = this.props;
    const { getFieldDecorator } = form;
    return (
      <Form>
        <Form.Item>
          {getFieldDecorator('name', {
            rules: [{ required: true, message: 'Please input your email!' }],
          })(<Input prefix={<Icon type="user" />} placeholder="Name" />)}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: 'Please input your Password!' }],
          })(<Input prefix={<Icon type="lock" />} type="password" placeholder="Password" />)}
        </Form.Item>
        <Button type="primary" onClick={this.handleSubmit}>
          Log in
        </Button>
      </Form>
    );
  }
}

export default FormLogin;
