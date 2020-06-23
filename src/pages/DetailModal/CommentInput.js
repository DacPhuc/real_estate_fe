import React, { PureComponent } from 'react';
import { Input } from 'antd';
import style from './index.less';

export default class CommentInput extends PureComponent {
  handlePostComment = e => {
    const { estate_id, submitComment } = this.props;
    const comment = e.target.value.trim();
    if (comment.length) {
      submitComment({ estate_id, comment });
    }
    e.target.value = '';
  };

  render() {
    return (
      <div className={style.commentInput}>
        <Input placeholder="Your comment" rows={2} onPressEnter={this.handlePostComment} />
      </div>
    );
  }
}
