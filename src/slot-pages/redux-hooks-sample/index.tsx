import { InitialState, RootDispatcher } from '@utils/store/root-reducer';
import React from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';

interface Props {
  width?: number;
  [propsName: string]: any;
}

interface StateProps {
  router: any;
  rootReducer: InitialState;
  [propsName: string]: any;
}

const ReduxHooksSample: React.FC<Props> = (props: Props) => {
  if (props) {
  }
  const dispatch = useDispatch();
  const rootDispatcher = new RootDispatcher(dispatch);
  const { counter } = useSelector<StateProps, InitialState>((state: StateProps) => {
    return {
      counter: state.rootReducer.counter,
    };
  }, shallowEqual);
  return (
      <div>
          <p>this is counter: {counter}</p>
          <button
              type="button"
              onClick={() => {
          rootDispatcher.updateCounter(counter + 1);
        }}
      >
              加一
          </button>
          <button
              type="button"
              onClick={() => {
          rootDispatcher.updateCounter(counter - 1);
        }}
      >
              减一
          </button>
      </div>
  );
};

export default ReduxHooksSample;
