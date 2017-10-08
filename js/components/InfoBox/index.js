import React, { Component } from 'react';
import classNames from 'classnames/bind';
import styles from './index.css';

const cx = classNames.bind(styles);

class InfoBox extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { title, body, footer } = this.props;

    return (
      <div className={cx('container')}>
        <div className={cx('title')}>
          {title}
        </div>
        <div className={cx('body')}>
          {body}
        </div>
        <div className={cx('footer')}>
          {footer}
        </div>
      </div>
    );
  }
}

InfoBox.propTypes = {
};

export default InfoBox;
