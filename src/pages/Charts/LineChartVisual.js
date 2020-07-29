import React, { PureComponent } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import moment from 'moment';
import { array } from 'prop-types';

export default class LineChartVisual extends PureComponent {
  render() {
    const { data } = this.props;
    data.sort((a, b) => {
      return new Date(a.date) - new Date(b.date);
    });
    console.log(data);
    return data.length ? (
      <LineChart
        width={1400}
        height={800}
        data={data}
        margin={{
          top: 20,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid />
        <XAxis dataKey="date" />
        <YAxis dataKey="price" />
        <Tooltip />
        <Legend />
        <Line type="float" dataKey="price" stroke="#8884d8" activeDot={{ r: 8 }} />
      </LineChart>
    ) : null;
  }
}
