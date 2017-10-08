import React, { Component } from 'react';
import classNames from 'classnames/bind';
import { ResponsiveContainer, LineChart, Line, Label, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import styles from './index.css';

const cx = classNames.bind(styles);

class TimeChart extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { data } = this.props;

    return (
      <div className={cx('container')}>
        <ResponsiveContainer width="100%" height={500}>
          <LineChart
            data={data}
            margin={{ top: 10, right: 10, left: -20, bottom: 10 }}
          >
            <XAxis
              dataKey="time"
              type="category"
              stroke="#fff"
              strokeWidth={2}
              label={{ position: 'top' }}
              dy={14}
            />
            <YAxis
              scale="linear"
              type="number"
              stroke="#fff"
              strokeWidth={2}
              domain={['dataMin - 1', 'dataMax + 1']}
              dx={-14}
            >
            </YAxis>
            <CartesianGrid stroke='#f5f5f533' />
            <Tooltip
              wrapperStyle={{ backgroundColor: "#0099ff" }}
            />
            <Line
              type="natural"
              unit="C"
              animationDurationNumber={500}
              dataKey="value"
              stroke="#ffff00"
              strokeWidth={2}
              activeDot={{ r: 4 }}
              dot={{ r: 1 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    );
  }
}

TimeChart.propTypes = {
};

export default TimeChart;
