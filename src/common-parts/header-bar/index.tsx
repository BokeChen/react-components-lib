import React from 'react';
import styles from './index.module.scss';
// import blue from './assets/images/headerbluebar.png';

interface IFProps {
  title: string;
  des: string;
  customStyle?: object;
  [key: string]: any;
}

export default function HeaderBar(props: IFProps) {
  return (
      <div className={styles.wrap}>
          <span className={styles.yellowBar} />
          <span className={styles.title}>{props.title}</span>
          <span className={styles.blueBar} style={props.customStyle ? props.customStyle : {}}>
              <b>{props.des || 'REAL-TIME VIDEO'}</b>
          </span>
      </div>
  );
}

export function HeaderBarOne(props: IFProps) {
  return (
      <div className={styles.wrap}>
          <span className={styles.yellowBar} />
          <span className={styles.title}>{props.title}</span>
          <span className={styles.blueBarOne} style={props.customStyle ? props.customStyle : {}}>
              <b>{props.des || ''}</b>
          </span>
      </div>
  );
}

export function HeaderBarTwo(props: IFProps) {
  return (
      <div className={styles.wrap}>
          <span className={styles.yellowBar} />
          <span className={styles.title}>{props.title}</span>
          <span className={styles.blueBar} style={props.customStyle ? props.customStyle : {}}>
              <i className={styles.tips}>最近30天</i>
              <b>{props.des || ''}</b>
          </span>
      </div>
  );
}
