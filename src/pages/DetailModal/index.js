import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Modal } from 'antd';

export default class DetailModal extends PureComponent {
  render() {
    const { visible } = this.props;
    return visible ? (
      <Modal visible={visible} onCancel={this.handleCloseMapView}>
        <p>Hello cac ban</p>
      </Modal>
    ) : null;
  }
}
