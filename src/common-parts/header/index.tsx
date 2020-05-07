import { Layout } from 'antd';
import React from 'react';
import styles from './assets/styles/index.module.scss';
import headerUIObject from './headerUi';
// interface Props {
//   [key: string]: any;
// }
const { Header } = Layout;
// 业务逻辑组件
export default function CommonHeader() {
  return <Header className={styles.wrap}>{headerUIObject.renderFunction(styles)}</Header>;
}
