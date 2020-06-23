import { Button, Col, Form, Input, Row, Checkbox, Affix, Carousel } from 'antd';
import React, { Component } from 'react';
import FormLogin from './FormLogin';
import FormSignUp from './FormSignUp';
import Link from 'umi/link';
import { connect } from 'dva';
import styles from './index.less';

@connect(({ login }) => ({
  login,
}))
class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      status: 'New account ->',
    };
  }
  handleSubmit = () => {
    const { form, dispatch } = this.props;
    form.validateFieldsAndScroll((err, values) => {
      if (err) {
        return false;
      }
    });
  };

  handleChangeForm = current => {
    this.setState({
      status: current === 0 ? 'New account ->' : '<- Sign in',
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
    const { status } = this.state;
    return (
      <>
        <div className={styles.header}></div>
        <div className={styles.main}>
          <Row type="flex" justify="space-between">
            <Col span={8} />
            <Col span={8} style={{ textAlign: 'center' }}>
              <Carousel afterChange={this.handleChangeForm}>
                <div>
                  <FormLogin handleLogin={this.handleLogin} />
                </div>
                <div>
                  <FormSignUp handleSignUp={this.handleSignUp} />
                </div>
              </Carousel>
              <p style={{ textAlign: 'center' }}>{status}</p>
            </Col>
            <Col span={8} />
          </Row>
        </div>
      </>
    );
  }
}

export default LoginPage;
