import React, { Component } from 'react';
import { Descriptions, Badge, Button, notification } from 'antd';
import { connect } from 'dva';
import { Select } from 'antd';
import LineChartVisual from './LineChartVisual';
import estate from '@/models/estate';
import { visualize } from '@/services/estate';
const { Option } = Select;

// Connect with model example
@connect(({ estate, loading }) => ({
  estate,
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
    const { estate, loadingGetData } = this.props;
    const { visualizeObject, visualData } = estate;
    const { HCM, HN, city, estate_type, transaction_type } = visualizeObject;

    return (
      <div>
        <h2>Select field value to show price chart base on location</h2>
        <div>
          <Select style={{ width: 120 }} onChange={this.changeCity}>
            {city &&
              city.map(ele => {
                return <Option value={ele}>{ele}</Option>;
              })}
          </Select>

          {selectedCity === 'Hồ Chí Minh' ? (
            <Select style={{ width: 120 }} onChange={this.handleDistrict} disabled={!selectedCity}>
              {HCM &&
                HCM.map(ele => {
                  return <Option value={ele}>{ele}</Option>;
                })}
            </Select>
          ) : (
            <Select style={{ width: 120 }} onChange={this.handleDistrict} disabled={!selectedCity}>
              {HN &&
                HN.map(ele => {
                  return <Option value={ele}>{ele}</Option>;
                })}
            </Select>
          )}

          <Select style={{ width: 120 }} onChange={this.handleTransaction}>
            {transaction_type &&
              transaction_type.map(ele => {
                return <Option value={ele}>{ele}</Option>;
              })}
          </Select>

          <Select style={{ width: 120 }} onChange={this.handleEstate}>
            {estate_type &&
              estate_type.map(ele => {
                return <Option value={ele}>{ele}</Option>;
              })}
          </Select>

          <Button type="primary" onClick={this.showVisual}>
            Display
          </Button>
        </div>
        <LineChartVisual data={visualData} />
      </div>
    );
  }
}
