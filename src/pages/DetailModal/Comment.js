import React, { PureComponent } from 'react';
import { Avatar } from 'antd';

export default class Comment extends PureComponent {
  render() {
    const { comment, name } = this.props;

    return (
      <div style={{ padding: '10px' }}>
        <div style={{ display: 'flex' }}>
          <Avatar style={{ backgroundColor: '#87d068' }} icon="user" />
          <h3 style={{ marginLeft: '10px' }}>{name}</h3>
        </div>
        <div style={{ paddingLeft: '10px', marginTop: '5px' }}>{comment}</div>
      </div>
    );
  }
}
