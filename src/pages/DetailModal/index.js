import React, { Component } from 'react';
import { connect } from 'dva';
import CommentBox from './CommentBox';
import CommentInput from './CommentInput';
import { Modal, Descriptions } from 'antd';
import style from './index.less';

@connect(({ estate, loading }) => ({
  estate,
}))
export default class DetailModal extends Component {
  submitComment = value => {
    const { dispatch } = this.props;
    dispatch({
      type: 'estate/postComment',
      payload: value,
    });
  };

  render() {
    const { visible, currentEstate, handleToggleShowDetail } = this.props;
    return visible ? (
      <Modal
        visible={visible}
        title="Estate detail"
        footer={null}
        onCancel={handleToggleShowDetail}
      >
        <Descriptions layout="vertical" bordered>
          <Descriptions.Item label="Street">{currentEstate.addr_street}</Descriptions.Item>
          <Descriptions.Item label="Ward">{currentEstate.addr_ward}</Descriptions.Item>
          <Descriptions.Item label="District">{currentEstate.addr_district}</Descriptions.Item>
          <Descriptions.Item label="City">{currentEstate.addr_city}</Descriptions.Item>
          <Descriptions.Item label="Phone">{currentEstate.phone}</Descriptions.Item>
          <Descriptions.Item label="Other information">{currentEstate.title}</Descriptions.Item>
          <Descriptions.Item label="Surrounding">{currentEstate.addr_street}</Descriptions.Item>
        </Descriptions>
        <CommentBox currentEstate={currentEstate} />
        <CommentInput estate_id={currentEstate.index} submitComment={this.submitComment} />
      </Modal>
    ) : null;
  }
}
