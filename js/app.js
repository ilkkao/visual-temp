import React from 'react';
import { render } from 'react-dom';
import classNames from 'classnames/bind';
import InfoBox from './components/InfoBox';
import TimeChart from './components/TimeChart';
import styles from './app.css';

const cx = classNames.bind(styles);

render((
  <div>
    <div className={cx('title')}>
      Temperature monitor
    </div>
    <div className={cx('container')}>
      <InfoBox
        title="LATEST"
        body={`${data.latest.value} °C`}
        footer={data.latest.ts}
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
      />
      <InfoBox
        title="MIN EVER"
      />
      <TimeChart
        data={data.history}
      />
    </div>
  </div>
), document.getElementById('main'));
