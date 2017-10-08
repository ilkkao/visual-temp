import React from 'react';
import { render } from 'react-dom';
import classNames from 'classnames/bind';
import InfoBox from './components/InfoBox';
import TimeChart from './components/TimeChart';
import styles from './app.css';

const cx = classNames.bind(styles);

render((
  <div className={cx('container')}>
    <InfoBox
      title="Latest"
      body={`${data.latest.value} °C`}
      footer={data.latest.ts}
    />
    <InfoBox
      title="Max today"
    />
    <InfoBox
      title="Min today"
    />
    <InfoBox
      title="Max yesterday"
    />
    <InfoBox
      title="Min yesterday"
    />
    <InfoBox
      title="Max ever"
    />
    <InfoBox
      title="Min ever"
    />
    <TimeChart
      data={data.history}
    />
  </div>
), document.getElementById('main'));
