import React, { Component } from 'react';
import { connect } from 'dva';

let stompClient;

@connect(({ estate, loading }) => ({
  estate,
  loadingGetData: loading.effects['estate/getEstate'],
  loadingGetMap: loading.effects['estate/getGeolocation'],
}))
export default class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: null,
    };
  }

  componentDidMount() {
    this.connect();
  }

  connect = () => {
    const Stomp = require('stompjs');
    var SockJS = require('sockjs-client');
    SockJS = new SockJS('http://localhost:8080/api/ws');
    console.log(SockJS);
    stompClient = Stomp.over(SockJS);
    stompClient.connect({}, this.onConnected, this.onError);
  };

  onConnected = () => {
    stompClient.subscribe('/topic/dacphuc', this.onMessageReceived);
  };

  onMessageReceived = payload => {
    const mess = JSON.parse(payload.body);
    this.setState({
      message: payload.body,
    });
  };

  onError = error => {
    console.log('Error when connect to websocket');
    console.log(error);
  };

  render() {
    const { message } = this.state;
    return <h1>Longtitude and Latitude receive: {message}</h1>;
  }
}
