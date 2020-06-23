import { Button, Col, Form, Input, Row, Checkbox } from 'antd';
import React, { Component } from 'react';
import Link from 'umi/link';
import { connect } from 'dva';
import styles from './index.less';

@Form.create()
class FormSignUp extends Component {
  handleSubmit = () => {
    const { form, handleSignUp } = this.props;
    form.validateFieldsAndScroll((err, values) => {
      if (err) {
        return false;
      }
      handleSignUp(values);
    });
  };

  render() {
    const { form } = this.props;
    const { getFieldDecorator } = form;
    return (
      <Form>
        <Form.Item>
          {getFieldDecorator('name', {
            rules: [
              {
                required: true,
                message: 'Please input your username.',
              },
            ],
          })(<Input placeholder="User Name" />)}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('email', {
            rules: [
              {
                required: true,
                message: 'Please input your email.',
              },
            ],
          })(<Input placeholder="Email" />)}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('password', {
            rules: [
              {
                required: true,
                message: 'Please input your password.',
              },
            ],
          })(<Input placeholder="Password" type="password" onPressEnter={this.handleSubmit} />)}
        </Form.Item>
        <Button onClick={this.handleSubmit}>Sign up</Button>
      </Form>
    );
  }
}

export default FormSignUp;
