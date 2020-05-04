import CommonHeader from '@common-parts/header';
import React, { useReducer } from 'react';
import styles from './assets/styles/home.module.css';

const initialCount = { count: 0 };
function reducer(state: { count: number }, action: { type: string; payload?: number }) {
  switch (action.type) {
    case 'increment':
      return { count: state.count + 1 };
    case 'decrement':
      return { count: state.count - 1 };

    default:
      throw new Error('reduce 报错');
  }
}
export default function Home() {
  const [state, dispatch] = useReducer(reducer, initialCount);
  return (
      <>
          <CommonHeader />
          <button type="button" className={styles.wrap} onClick={() => dispatch({ type: 'increment' })}>
              home {state.count}
          </button>
      </>
  );
}
