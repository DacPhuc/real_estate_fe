import React, { PureComponent } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import moment from 'moment';

export default class LineChartVisual extends PureComponent {
  render() {
    const { data } = this.props;
    console.log(data);
    return (
      <LineChart
        width={500}
        height={300}
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis dataKey="price" />
        <Tooltip />
        <Legend />
        <Line type="float" dataKey="price" stroke="#8884d8" activeDot={{ r: 8 }} />
      </LineChart>
    );
  }
}
