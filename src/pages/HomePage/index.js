import React, { Component } from 'react';
import { Table, Divider, Tag } from 'antd';
import { connect } from 'dva';

const columns = [
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
];

@connect(({ estate, loading }) => ({
  estate,
  loadingGetData: loading.effects['estate/getEstate'],
}))
export default class HomePage extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'estate/getEstate',
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

  render() {
    const { estate, loadingGetData } = this.props;
    const { list, totalElement, numberOfElements } = estate;
    return (
      <Table
        columns={columns}
        dataSource={list}
        pagination={{ pageSize: numberOfElements, total: totalElement }}
        onChange={this.handleChangePage}
        loading={loadingGetData}
      />
    );
  }
}
