import React from 'react';
import { Input, Form, Select, Button, Slider } from 'antd';
import Lottie from 'react-lottie';

import style from './index.less';
const { Option } = Select;

const CITY = {
  HCM: 'Hồ Chí Minh',
  HN: 'Hà Nội',
};

@Form.create()
export default class SearchBoxOption extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      selectedCity: false,
    };
  }
  submit = () => {
    const { form, dispatch, searchEstate } = this.props;
    form.validateFieldsAndScroll((err, values) => {
      if (err) {
        return false;
      }
      const minPrice = values.price[0];
      const maxPrice = values.price[1];
      const data = { ...values, minPrice, maxPrice };
      delete data.price;
      searchEstate(data);
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
    const { form, locationData } = this.props;
    const { getFieldDecorator } = form;
    const { selectedCity } = this.state;
    const { HCM, HN, estate_type } = locationData;

    return (
      <>
        <div>
          <div className={style.searchPicker}>
            <Form.Item>
              {getFieldDecorator('city')(
                <Select placeholder="City" style={{ width: 160 }} onChange={this.changeCity}>
                  <Option value="Hồ Chí Minh">Hồ Chí Minh</Option>
                  <Option value="Hà Nội">Hà Nội</Option>
                </Select>
              )}
            </Form.Item>
            {selectedCity === CITY.HCM ? (
              <Form.Item>
                {getFieldDecorator('district')(
                  <Select placeholder="District" style={{ width: 160 }} disabled={!selectedCity}>
                    {HCM &&
                      HCM.map(ele => {
                        return <Option value={ele}>{ele}</Option>;
                      })}
                  </Select>
                )}
              </Form.Item>
            ) : (
              <Form.Item>
                {getFieldDecorator('district')(
                  <Select placeholder="District" style={{ width: 160 }} disabled={!selectedCity}>
                    {HN &&
                      HN.map(ele => {
                        return <Option value={ele}>{ele}</Option>;
                      })}
                  </Select>
                )}
              </Form.Item>
            )}

            <Form.Item>
              {getFieldDecorator('real_type')(
                <Select placeholder="Estate Type" style={{ width: 160 }}>
                  {estate_type &&
                    estate_type.map(type => {
                      return <Option value={type}>{type}</Option>;
                    })}
                </Select>
              )}
            </Form.Item>
          </div>
          <Form.Item label="Price range (/tỷ đồng)">
            {getFieldDecorator('price', {
              initialValue: [0, 1],
            })(<Slider range defaultValue={[0, 1]} min={0} max={10} />)}
          </Form.Item>
          <Form.Item>
            <Button type="primary" onClick={this.submit}>
              Search
            </Button>
          </Form.Item>
        </div>
      </>
    );
  }
}
