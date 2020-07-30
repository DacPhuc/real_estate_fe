import { Button, Col, Form, Input, Checkbox, Icon, Collapse, Result, Tooltip } from 'antd';
import React, { Component } from 'react';
import { connect } from 'dva';
import SearchBoxOption from './SearchBoxOption';

const { Panel } = Collapse;

@connect(({ estate, loading, login }) => ({
  estate,
  login,
  loadingGetData: loading.effects['estate/getVisualize'],
}))
class SearchBox extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'estate/getVisualize',
    });
  }

  searchEstate = value => {
    const { dispatch } = this.props;
    dispatch({
      type: 'estate/search',
      payload: value,
    });
  };

  render() {
    const { loadingGetPrice, locationData, estate } = this.props;
    const { visualizeObject } = estate;
    return (
      <Collapse defaultActiveKey="1">
        <Panel header="Search" key="1">
          <SearchBoxOption locationData={visualizeObject} searchEstate={this.searchEstate} />
        </Panel>
      </Collapse>
    );
  }
}

export default SearchBox;
