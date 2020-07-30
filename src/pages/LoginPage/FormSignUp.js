import { Button, Col, Form, Input, Row, Checkbox, Icon } from 'antd';
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
    const { form, loading } = this.props;
    const { getFieldDecorator } = form;
    return (
      <div className={styles.main}>
        <div className={styles.textSignUp}>NEW AT REAL ESTATE?</div>
        <div className={styles.signUpMessage}>
          <p>
            <Icon
              type="heart"
              theme="twoTone"
              twoToneColor="#eb2f96"
              style={{ marginLeft: '10px', marginRight: '20px' }}
            />
            Access advance feature
          </p>
          <p>
            <Icon
              type="heart"
              theme="twoTone"
              twoToneColor="#eb2f96"
              style={{ marginLeft: '10px', marginRight: '20px' }}
            />
            Be part of the beneficial REAL ESTATE
          </p>
        </div>
        <Form.Item label="User Name">
          {getFieldDecorator('name', {
            rules: [
              {
                required: true,
                message: 'Please input your username.',
              },
            ],
          })(<Input prefix={<Icon type="user" />} size="large" placeholder="User Name" />)}
        </Form.Item>
        <Form.Item label="Email">
          {getFieldDecorator('email', {
            rules: [
              {
                required: true,
                message: 'Please input your email.',
              },
            ],
          })(<Input prefix={<Icon type="mail" />} size="large" placeholder="Email" />)}
        </Form.Item>
        <Form.Item label="Password">
          {getFieldDecorator('password', {
            rules: [
              {
                required: true,
                message: 'Please input your password.',
              },
            ],
          })(
            <Input
              prefix={<Icon type="lock" />}
              size="large"
              placeholder="Password"
              type="password"
              onPressEnter={this.handleSubmit}
            />
          )}
        </Form.Item>
        <Button onClick={this.handleSubmit} loading={loading} className={styles.btw} size="large">
          Sign up
        </Button>
      </div>
    );
  }
}

export default FormSignUp;
