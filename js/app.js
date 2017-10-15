import React from 'react';
import { render } from 'react-dom';
import moment from 'moment-timezone';
import classNames from 'classnames/bind';
import InfoBox from './components/InfoBox';
import TimeChart from './components/TimeChart';
import styles from './app.css';

const cx = classNames.bind(styles);

const historyValues = data.history.map(({ time, value }) => ({ time: moment.unix(time).tz('Europe/Helsinki').format('HH:mm'), temperature: value }));
const latestTempTime = moment.unix(data.latest.ts).fromNow();
const everMaxTempTime = moment.unix(data.ever.max.ts).format('dd, D.M.YY, HH:mm');
const everMinTempTime = moment.unix(data.ever.min.ts).format('dd, D.M.YY, HH:mm');

render((
  <div>
    <div className={cx('title')}>
      Temperature monitor
    </div>
    <div className={cx('container')}>
      <InfoBox
        title="LATEST"
        body={`${data.latest.value} °C`}
        footer={latestTempTime}
      />
      <InfoBox
        title="MAX TODAY"
      />
      <InfoBox
        title="MIN TODAY"
      />
      <InfoBox
        title="MAX YESTERDAY"
      />
      <InfoBox
        title="MIN YESTERDAY"
      />
      <InfoBox
        title="MAX EVER"
        body={`${data.ever.max.value} °C`}
        footer={everMaxTempTime}
      />
      <InfoBox
        title="MIN EVER"
        body={`${data.ever.min.value} °C`}
        footer={everMinTempTime}
      />
      <TimeChart
        data={historyValues}
      />
    </div>
  </div>
), document.getElementById('main'));
