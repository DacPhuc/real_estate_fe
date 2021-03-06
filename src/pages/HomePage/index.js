import React, { Component } from 'react';
import { Table, Divider, Tag, Button } from 'antd';
import MapLocation from '../MapLocation';
import DetailModal from '../DetailModal';
import PickLocation from '@/components/PickLocation';
import SearchBox from '@/components/SearchBox';
import { connect } from 'dva';
import style from './index.less';

const columns = (handleShowMap, loadingFetchMap, showDetailEstate) => [
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
    title: 'Unit',
    dataIndex: 'price_unit',
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
          <Button type="primary" onClick={e => showDetailEstate(e, record)}>
            Detail
          </Button>
        </div>
      );
    },
  },
];

let stompClient;

@connect(({ estate, loading }) => ({
  estate,
  loadingGetData: loading.effects['estate/getEstate'],
  loadingGetMap: loading.effects['estate/getGeolocation'],
}))
export default class HomePage extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    this.connect();
    dispatch({
      type: 'estate/getEstate',
      // pagination
      payload: { page: 0, pageSize: 10 },
    });
    dispatch({
      type: 'estate/getVisualize',
    });
  }

  connect = () => {
    const Stomp = require('stompjs');
    var SockJS = require('sockjs-client');
    SockJS = new SockJS('http://localhost:8080/api/ws');
    console.log(SockJS);
    stompClient = Stomp.over(SockJS);
    stompClient.connect({}, this.onConnected, this.onError);
  };

  onConnected = () => {
    stompClient.subscribe('/topic/dacphuc', this.onMessageReceived);
  };

  onMessageReceived = payload => {
    const { dispatch } = this.props;
    const coordinate = JSON.parse(payload.body);
    dispatch({
      type: 'estate/setCoordinate',
      payload: coordinate,
    });
  };

  onError = error => {
    console.log('Error when connect to websocket');
    console.log(error);
  };

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

  showDetailEstate = (e, estate) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'estate/setCurrentEstate',
      payload: estate,
    });
  };

  handleToggleShowDetail = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'estate/toggleShowDetail',
    });
  };

  changeLightStatus = (e, status) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'estate/changeLightStatus',
      payload: status,
    });
  };

  render() {
    const { estate, loadingGetData, loadingGetMap } = this.props;
    const {
      list,
      totalElement,
      numberOfElements,
      popUpShowMap,
      geoLocation,
      popUpShowDetail,
      currentEstate,
      visualizeObject,
    } = estate;
    return (
      <div>
        <div style={{ marginBottom: '20px' }}>
          <h1>Control light</h1>
          <Button style={{ marginRight: '20px' }} onClick={e => this.changeLightStatus(e, 1)}>
            Turn on light
          </Button>
          <Button onClick={e => this.changeLightStatus(e, 2)}>Turn off light</Button>
        </div>
        <div style={{ marginBottom: '20px' }}>
          <PickLocation locationData={visualizeObject} />
        </div>
        <SearchBox />
        <Table
          columns={columns(this.handleShowMap, loadingGetMap, this.showDetailEstate)}
          dataSource={list}
          pagination={{ pageSize: numberOfElements, total: totalElement }}
          onChange={this.handleChangePage}
          loading={loadingGetData}
        />
        <MapLocation visible={popUpShowMap} geoLocation={geoLocation} />
        <DetailModal
          visible={popUpShowDetail}
          currentEstate={currentEstate}
          handleToggleShowDetail={this.handleToggleShowDetail}
        />
      </div>
    );
  }
}
