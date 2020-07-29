import { Button, Col, Form, Input, Checkbox, Icon, Collapse, Result } from 'antd';
import React, { Component } from 'react';
import FormPickLocation from './FormPickLocation';
import { connect } from 'dva';
import styles from './index.less';

const { Panel } = Collapse;

@connect(({ estate, loading, login }) => ({
  estate,
  login,
  loadingGetData: loading.effects['estate/getVisualize'],
  loadingGetPrice: loading.effects['estate/getPredictionPrice'],
}))
class PickLocation extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'estate/getVisualize',
    });
  }

  getPredictionPrice = value => {
    const { dispatch } = this.props;
    dispatch({
      type: 'estate/getPredictionPrice',
      payload: value,
    });
  };

  render() {
    const { loadingGetPrice, login, locationData, estate } = this.props;
    const { status } = login;
    const { predictionPrice } = estate;
    return (
      <Collapse>
        <Panel header="Predict price" key="1">
          {status ? (
            <div>
              <FormPickLocation
                locationData={locationData}
                getPredictionPrice={this.getPredictionPrice}
                loadingGetPrice={loadingGetPrice}
                price={predictionPrice}
              />
            </div>
          ) : (
            <Result
              status="403"
              subTitle="Please sign up or login to perform this action"
              extra={
                <Button
                  type="primary"
                  onClick={() => {
                    router.push('/login');
                  }}
                >
                  Sign up/Login
                </Button>
              }
            />
          )}
        </Panel>
      </Collapse>
    );
  }
}

export default PickLocation;
