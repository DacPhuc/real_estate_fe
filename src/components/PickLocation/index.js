import { Button, Col, Form, Input, Checkbox, Icon } from 'antd';
import React, { Component } from 'react';
import { connect } from 'dva';
import styles from './index.less';

@Form.create()
@connect(({ estate, loading }) => ({
  estate,
  loadingGetData: loading.effects['estate/getVisualize'],
}))
class PickLocation extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'estate/getVisualize',
    });
  }

  render() {
    console.log(this.props);
    const { form, loading } = this.props;
    const { getFieldDecorator } = form;
    return <div className={styles.main}>Hello World</div>;
  }
}

export default PickLocation;
