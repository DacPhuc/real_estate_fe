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
    const { form, loading } = this.props;
    const { getFieldDecorator } = form;
    return (
      <div className={styles.main}>
        <div className={styles.text}>LOGIN</div>
        <Form.Item label="User Name">
          {getFieldDecorator('name', {
            rules: [{ required: true, message: 'Please input your email!' }],
          })(<Input size="large" prefix={<Icon type="user" />} placeholder="Name" />)}
        </Form.Item>
        <Form.Item label="Password">
          {getFieldDecorator('password', {
            rules: [{ required: true, message: 'Please input your Password!' }],
          })(
            <Input
              size="large"
              prefix={<Icon type="lock" />}
              type="password"
              placeholder="Password"
              onPressEnter={this.handleSubmit}
            />
          )}
        </Form.Item>
        <Button onClick={this.handleSubmit} loading={loading} className={styles.btw} size="large">
          Log in
        </Button>
      </div>
    );
  }
}

export default FormLogin;
