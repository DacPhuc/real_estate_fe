import React, { Component } from 'react';
import { Descriptions, Badge, Button, notification, Collapse, Tooltip, Result, Icon } from 'antd';
import { connect } from 'dva';
import { Select } from 'antd';
import LineChartVisual from './LineChartVisual';
import estate from '@/models/estate';
import { visualize } from '@/services/estate';
import style from './index.less';
const { Option } = Select;
const { Panel } = Collapse;

// Connect with model example
@connect(({ estate, loading, login }) => ({
  estate,
  login,
  loadingGetData: loading.effects['estate/getVisualize'],
}))
export default class Charts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedCity: null,
      selectedDist: null,
      selectedTransaction: null,
      selectedEstate: null,
    };
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'estate/getVisualize',
    });
  }

  changeCity = value => {
    this.setState({
      selectedCity: value,
    });
  };

  handleTransaction = value => {
    this.setState({
      selectedTransaction: value,
    });
  };

  handleEstate = value => {
    this.setState({
      selectedEstate: value,
    });
  };

  handleDistrict = value => {
    this.setState({
      selectedDist: value,
    });
  };

  showVisual = () => {
    const { selectedCity, selectedDist, selectedTransaction, selectedEstate } = this.state;
    const { dispatch } = this.props;
    if (selectedCity && selectedDist && selectedTransaction && selectedEstate) {
      dispatch({
        type: 'estate/getPriceVisual',
        payload: {
          city: selectedCity,
          district: selectedDist,
          transaction: selectedTransaction,
          realestate: selectedEstate,
        },
      });
    } else {
      notification.open();
    }
  };

  render() {
    const { selectedCity } = this.state;
    const { estate, loadingGetData, login } = this.props;
    const { status } = login;
    const { visualizeObject, visualData } = estate;
    const { HCM, HN, city, estate_type, transaction_type } = visualizeObject;

    return (
      <div>
        <h2>Select field value to show price chart base on location</h2>
        <Collapse>
          <Panel header="Price Chart" key="1">
            {status ? (
              <div className={style.optionBox}>
                <Select style={{ width: 200 }} onChange={this.changeCity} placeholder="Choose city">
                  {city &&
                    city.map(ele => {
                      return <Option value={ele}>{ele}</Option>;
                    })}
                </Select>
                {selectedCity === 'Hồ Chí Minh' ? (
                  <Select
                    style={{ width: 200 }}
                    onChange={this.handleDistrict}
                    disabled={!selectedCity}
                    placeholder="Choose district"
                  >
                    {HCM &&
                      HCM.map(ele => {
                        return <Option value={ele}>{ele}</Option>;
                      })}
                  </Select>
                ) : (
                  <Select
                    style={{ width: 200 }}
                    onChange={this.handleDistrict}
                    disabled={!selectedCity}
                    placeholder="Choose district"
                  >
                    {HN &&
                      HN.map(ele => {
                        return <Option value={ele}>{ele}</Option>;
                      })}
                  </Select>
                )}

                <Select
                  style={{ width: 200 }}
                  onChange={this.handleTransaction}
                  placeholder="Choose transaction type"
                >
                  {transaction_type &&
                    transaction_type.map(ele => {
                      return <Option value={ele}>{ele}</Option>;
                    })}
                </Select>

                <Select
                  style={{ width: 200 }}
                  onChange={this.handleEstate}
                  placeholder="Choose Estate Type"
                >
                  {estate_type &&
                    estate_type.map(ele => {
                      return <Option value={ele}>{ele}</Option>;
                    })}
                </Select>

                <Button type="primary" onClick={this.showVisual}>
                  Display
                </Button>
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

        <LineChartVisual data={visualData} />
      </div>
    );
  }
}
