import React, { Component } from 'react';
import { List, Avatar } from 'antd';
import { connect } from 'dva';
import Comment from './Comment';
import style from './index.less';

let stompClient;

@connect(({ estate, loading }) => ({
  estate,
}))
export default class CommentBox extends Component {
  constructor(props) {
    super(props);
    this.mesRef = React.createRef();
  }

  componentDidMount() {
    const { dispatch, currentEstate } = this.props;
    dispatch({
      type: 'estate/getListComment',
      payload: currentEstate.index,
    });
    this.connect();
  }

  componentDidUpdate() {
    this.scrollToBottom();
  }

  scrollToBottom = () => {
    this.mesRef.current.scrollTop = this.mesRef.current.scrollHeight;
  };

  connect = () => {
    const Stomp = require('stompjs');
    var SockJS = require('sockjs-client');
    SockJS = new SockJS('http://localhost:8080/api/ws');
    stompClient = Stomp.over(SockJS);
    stompClient.connect({}, this.onConnected, this.onError);
  };

  onConnected = () => {
    stompClient.subscribe('/topic/comment', this.onMessageReceived);
  };

  onMessageReceived = payload => {
    const { currentEstate, dispatch } = this.props;
    const id = payload.body;
    if (currentEstate.index == id) {
      dispatch({
        type: 'estate/getListComment',
        payload: currentEstate.index,
      });
    }
  };

  onError = error => {
    console.log('Error when connect to websocket');
  };

  render() {
    const { estate } = this.props;
    const { listComment } = estate;
    return (
      <div className={style.commentBox} ref={this.mesRef}>
        {listComment.map(comment => {
          return <Comment name={comment.name} comment={comment.comment} />;
        })}
      </div>
    );
  }
}
