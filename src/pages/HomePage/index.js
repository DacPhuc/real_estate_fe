import React, { Component } from 'react';
import { Table, Divider, Tag, Button } from 'antd';
import MapLocation from '../MapLocation';
import DetailModal from '../DetailModal';
import { connect } from 'dva';
import style from './index.less';

const columns = (handleShowMap, loadingFetchMap) => [
  {
    title: 'id',
    dataIndex: 'index',
    key: 'index',
    render: text => <p>{text}</p>,
  },
  {
    title: 'Street',
    dataIndex: 'addr_street',
    key: 'addr_street',
    render: text => <p>{text}</p>,
  },
  {
    title: 'City',
    dataIndex: 'addr_city',
    key: 'addr_city',
    render: text => <p>{text}</p>,
  },
  {
    title: 'Price',
    dataIndex: 'price',
    key: 'price',
    render: text => <p>{text}</p>,
  },
  {
    title: 'Contact',
    dataIndex: 'phone',
    key: 'contact',
    render: text => <p>{text}</p>,
  },
  {
    title: 'Action',
    key: 'action',
    render: (value, record) => {
      return (
        <div className={style.action}>
          <Button
            onClick={e => handleShowMap(e, record.index)}
            loading={loadingFetchMap}
            type="primary"
          >
            View on map
          </Button>
          <Button type="primary">Detail</Button>
        </div>
      );
    },
  },
];

@connect(({ estate, loading }) => ({
  estate,
  loadingGetData: loading.effects['estate/getEstate'],
  loadingGetMap: loading.effects['estate/getGeolocation'],
}))
export default class HomePage extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'estate/getEstate',
      // pagination
      payload: { page: 0, pageSize: 10 },
    });
  }

  handleChangePage = page => {
    const { dispatch } = this.props;
    dispatch({
      type: 'estate/getEstate',
      payload: { page: page.current - 1, pageSize: 10 },
    });
  };

  handleShowMap = (e, id) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'estate/getGeolocation',
      payload: { id },
    });
  };

  render() {
    const { estate, loadingGetData, loadingGetMap } = this.props;
    const { list, totalElement, numberOfElements, popUpShowMap, geoLocation } = estate;
    return (
      <div>
        <MapLocation visible={popUpShowMap} geoLocation={geoLocation} />
        <Table
          columns={columns(this.handleShowMap, loadingGetMap)}
          dataSource={list}
          pagination={{ pageSize: numberOfElements, total: totalElement }}
          onChange={this.handleChangePage}
          loading={loadingGetData}
        />
      </div>
    );
  }
}
