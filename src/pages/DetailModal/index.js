import React, { Component } from 'react';
import { connect } from 'dva';
import router from 'umi/router';
import CommentBox from './CommentBox';
import CommentInput from './CommentInput';
import { Modal, Descriptions, Result, Button } from 'antd';
import style from './index.less';

@connect(({ estate, loading, login }) => ({
  estate,
  login,
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
    const { visible, currentEstate, handleToggleShowDetail, login } = this.props;
    const { status } = login;
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
        {status ? (
          <div>
            <CommentBox currentEstate={currentEstate} />
            <CommentInput estate_id={currentEstate.index} submitComment={this.submitComment} />
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
      </Modal>
    ) : null;
  }
}
