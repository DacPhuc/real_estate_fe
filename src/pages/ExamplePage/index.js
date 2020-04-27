import React, { Component } from 'react';
import { connect } from 'dva';

// Connect with model example
@connect(({ example }) => ({
  example,
}))
export default class ExamplePage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    const { dispatch } = this.props;
  }

  render() {
    return <p>Hello</p>;
  }
}
