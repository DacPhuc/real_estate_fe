import { Button, Col, Form, Input, Row, Checkbox, Affix, Carousel } from 'antd';
import React, { Component } from 'react';
import FormLogin from './FormLogin';
import FormSignUp from './FormSignUp';
import Link from 'umi/link';
import { router } from 'umi';
import { connect } from 'dva';
import styles from './index.less';

@connect(({ login, loading }) => ({
  login,
  loadingLogin: loading.effects['login/login'],
  loadingSignUp: loading.effects['login/signUp'],
}))
class LoginPage extends Component {
  handleSubmit = () => {
    const { form, dispatch } = this.props;
    form.validateFieldsAndScroll((err, values) => {
      if (err) {
        return false;
      }
    });
  };

  handleLogin = values => {
    const { dispatch } = this.props;
    dispatch({
      type: 'login/login',
      payload: values,
    });
  };

  handleSignUp = values => {
    const { dispatch } = this.props;
    dispatch({
      type: 'login/signUp',
      payload: values,
    });
  };

  render() {
    const { loadingLogin, loadingSignUp } = this.props;
    return (
      <div>
        <Row type="flex" justify="space-between">
          <Col span={12} className={styles.formA}>
            <div className={styles.login}>
              <FormLogin handleLogin={this.handleLogin} loading={loadingLogin} />
            </div>
          </Col>
          <Col span={12}>
            <div className={styles.signup}>
              <FormSignUp handleSignUp={this.handleSignUp} loading={loadingSignUp} />
            </div>
          </Col>
        </Row>
      </div>
    );
  }
}

export default LoginPage;
