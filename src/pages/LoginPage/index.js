import { Button, Col, Form, Input, Row, Checkbox } from 'antd';
import React, { Component } from 'react';
import Link from 'umi/link';
import { connect } from 'dva';
import styles from './index.less';

@Form.create()
@connect(({ login }) => ({
  login,
}))
class LoginForm extends Component {
  handleSubmit = () => {
    const { form, dispatch } = this.props;
    form.validateFieldsAndScroll((err, values) => {
      if (err) {
        return false;
      }
      dispatch({
        type: 'login/login',
        payload: values,
      });
    });
  };

  render() {
    const { form } = this.props;
    const { getFieldDecorator } = form;
    return (
      <Row type="flex" justify="space-between" className={styles.content}>
        <div className={styles.loginForm}>
          <Form>
            <Form.Item className={styles.loginField} label="Username">
              {getFieldDecorator('name', {
                rules: [
                  {
                    required: true,
                    message: 'Please input your email.',
                  },
                ],
              })(<Input placeholder="Email" size="large" onPressEnter={this.handleSubmit} />)}
            </Form.Item>
            <Form.Item className={styles.loginField} label="Password">
              {getFieldDecorator('password', {
                rules: [
                  {
                    required: true,
                    message: 'Please input your password.',
                  },
                ],
              })(
                <Input
                  placeholder="Password"
                  type="password"
                  size="large"
                  onPressEnter={this.handleSubmit}
                />
              )}
            </Form.Item>
            <Row type="flex" justify="center" className={styles.loginButtonField}>
              <Button onClick={this.handleSubmit} className={styles.loginButton} block size="large">
                Sign in
              </Button>
            </Row>
          </Form>
        </div>
      </Row>
      // </div>
    );
  }
}

export default LoginForm;
