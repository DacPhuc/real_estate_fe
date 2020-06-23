import React, { Component } from 'react';
import { List, Avatar } from 'antd';
import { connect } from 'dva';
import Comment from './Comment';
import ScrollToBottom from 'react-scroll-to-bottom';
import style from './index.less';

@connect(({ estate, loading }) => ({
  estate,
}))
export default class CommentBox extends Component {
  componentDidMount() {
    const { dispatch, currentEstate } = this.props;
    console.log(currentEstate);
    dispatch({
      type: 'estate/getListComment',
      payload: currentEstate.index,
    });
  }

  render() {
    const { estate } = this.props;
    const { listComment } = estate;
    console.log(ScrollToBottom);
    return (
      <ScrollToBottom className={style.commentBox}>
        {listComment.map(comment => {
          return <Comment name={comment.name} comment={comment.comment} />;
        })}
      </ScrollToBottom>
    );
  }
}
