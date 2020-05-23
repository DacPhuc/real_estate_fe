import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Modal, Descriptions } from 'antd';

export default class DetailModal extends PureComponent {
  render() {
    const { visible, estate, handleToggleShowDetail } = this.props;
    console.log(estate);
    return visible ? (
      <Modal
        visible={visible}
        title="Estate detail"
        footer={null}
        onCancel={handleToggleShowDetail}
      >
        <Descriptions layout="vertical" bordered>
          <Descriptions.Item label="Street">{estate.addr_street}</Descriptions.Item>
          <Descriptions.Item label="Ward">{estate.addr_ward}</Descriptions.Item>
          <Descriptions.Item label="District">{estate.addr_district}</Descriptions.Item>
          <Descriptions.Item label="City">{estate.addr_city}</Descriptions.Item>
          <Descriptions.Item label="Phone">{estate.phone}</Descriptions.Item>
          <Descriptions.Item label="Other information">{estate.title}</Descriptions.Item>
          <Descriptions.Item label="Surrounding">{estate.addr_street}</Descriptions.Item>
        </Descriptions>
      </Modal>
    ) : null;
  }
}
