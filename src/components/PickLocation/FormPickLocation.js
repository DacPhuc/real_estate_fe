import React from 'react';
import { Input, Form, Select, Button } from 'antd';
import Lottie from 'react-lottie';
import loadingEffect from '@/assets/ninja.json';
import style from './index.less';
const { Option } = Select;

const CITY = {
  HCM: 'HồCHíMinh',
  HN: 'HàNội',
};

@Form.create()
export default class FormPickLocation extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      selectedCity: false,
    };
  }
  submit = () => {
    const { form, dispatch, handleLogin, getPredictionPrice } = this.props;
    form.validateFieldsAndScroll((err, values) => {
      if (err) {
        return false;
      }
      const district = values.district.replace(/ /g, '');
      const real_type = values.real_type.replace(/ /g, '');
      values.district = district;
      values.real_type = real_type;
      getPredictionPrice(values);
    });
  };

  changeCity = value => {
    const { form } = this.props;
    this.setState({
      selectedCity: value,
    });
    form.resetFields('district');
  };

  render() {
    const { form, locationData, loadingGetPrice, price } = this.props;
    const { getFieldDecorator } = form;
    const { selectedCity } = this.state;
    const { HCM, HN, estate_type } = locationData;

    const defaultOptions = {
      loop: true,
      autoplay: true,
      animationData: loadingEffect,
      rendererSettings: {
        preserveAspectRatio: 'xMidYMid slice',
      },
    };

    return (
      <>
        <div className={style.picklocation}>
          <Form.Item>
            {getFieldDecorator('transaction_type', {
              rules: [{ required: true, message: 'Please select transaction type!' }],
            })(
              <Select placeholder="Transaction Type" style={{ width: 170 }}>
                <Option value="thuê">Thuê</Option>
                <Option value="bán">Bán</Option>
              </Select>
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('city', {
              rules: [{ required: true, message: 'Please select city!' }],
            })(
              <Select placeholder="City" style={{ width: 170 }} onChange={this.changeCity}>
                <Option value="HồCHíMinh">Hồ Chí Minh</Option>
                <Option value="HàNội">Hà Nội</Option>
              </Select>
            )}
          </Form.Item>
          {selectedCity === CITY.HCM ? (
            <Form.Item>
              {getFieldDecorator('district', {
                rules: [{ required: true, message: 'Please select district!' }],
              })(
                <Select placeholder="District" style={{ width: 170 }} disabled={!selectedCity}>
                  {HCM &&
                    HCM.map(ele => {
                      return <Option value={ele}>{ele}</Option>;
                    })}
                </Select>
              )}
            </Form.Item>
          ) : (
            <Form.Item>
              {getFieldDecorator('district', {
                rules: [{ required: true, message: 'Please select district!' }],
              })(
                <Select placeholder="District" style={{ width: 170 }} disabled={!selectedCity}>
                  {HN &&
                    HN.map(ele => {
                      return <Option value={ele}>{ele}</Option>;
                    })}
                </Select>
              )}
            </Form.Item>
          )}

          <Form.Item>
            {getFieldDecorator('real_type', {
              rules: [{ required: true, message: 'Please select estate type!' }],
            })(
              <Select placeholder="Estate Type" style={{ width: 170 }}>
                {estate_type &&
                  estate_type.map(ele => {
                    return <Option value={ele}>{ele}</Option>;
                  })}
              </Select>
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('yard', {
              rules: [{ required: true, message: 'Please select this option!' }],
            })(
              <Select placeholder="Have rooftop" style={{ width: 170 }}>
                <Option value="0">No</Option>
                <Option value="1">Yes</Option>
              </Select>
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('balcony', {
              rules: [{ required: true, message: 'Please select this option!' }],
            })(
              <Select placeholder="Have balcony" style={{ width: 170 }}>
                <Option value="0">No</Option>
                <Option value="1">Yes</Option>
              </Select>
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('floor', {
              rules: [
                { required: true, message: 'How many floors' },
                {
                  validator: (rule, value, callback) => {
                    const decimal = value;
                    if (decimal < 0) {
                      callback('Value must be greater than 0');
                    }
                    callback();
                  },
                },
              ],
            })(
              <Input placeholder="How many floors" type="number" style={{ width: 170 }} min="0" />
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('area', {
              rules: [
                { required: true, message: 'How much area' },
                {
                  validator: (rule, value, callback) => {
                    const decimal = value;
                    if (decimal < 0) {
                      callback('Value must be greater than 0');
                    }
                    callback();
                  },
                },
              ],
            })(<Input placeholder="How much area" type="number" style={{ width: 170 }} min="0" />)}
          </Form.Item>
          <Form.Item>
            <Button type="primary" onClick={this.submit}>
              Get price
            </Button>
          </Form.Item>
        </div>
        {loadingGetPrice ? <Lottie options={defaultOptions} height={100} width={100} /> : null}
        <div>Price: {price}</div>
      </>
    );
  }
}
