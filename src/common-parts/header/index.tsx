import React from 'react';
import styles from './assets/styles/index.module.scss';
import headerUIObject from './headerUi';
// interface Props {
//   [key: string]: any;

// 业务逻辑组件
export default function CommonHeader() {
  return <div className={styles.wrap}>{headerUIObject.renderFunction(styles)}</div>;
}
