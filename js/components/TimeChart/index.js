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
        <div className={cx('title')}>
          TEMPERATURE DURING THE LAST 24 HOURS
        </div>
        <div className={cx('body')}>
          <ResponsiveContainer
            width="100%"
            height={400}
          >
            <LineChart
              data={data}
              margin={{ top: 6, right: 6, left: -26, bottom: 6 }}
            >
              <XAxis
                dataKey="time"
                type="category"
                stroke="#fff"
                strokeWidth={2}
                label={{ position: 'top' }}
                dy={14}
                tickCount={12}
                interval={20}
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
              <CartesianGrid
                stroke='#f5f5f522'
              />
              <Tooltip
                wrapperStyle={{ backgroundColor: "#0099ff" }}
                labelStyle={{ color: "#fff" }}
                itemStyle={{ color: "#fff" }}
              />
              <Line
                type="basis"
                unit="°C"
                animationDurationNumber={500}
                dataKey="value"
                stroke="#ffe700"
                strokeWidth={2}
                activeDot={{ stroke: "red", r: 4 }}
                dot={{ stroke: "#fff", r: 0.4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    );
  }
}

TimeChart.propTypes = {
};

export default TimeChart;
