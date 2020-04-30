import { Action, Dispatch, Reducer } from 'redux';

export interface InitialState {
  counter: number;
}
export const initialState: InitialState = {
  counter: 0,
};
export interface DispatchAction extends Action {
  payload: Partial<InitialState>;
}

export enum ActionType {
  updateCounter,
}
export const rootReducer: Reducer<InitialState, DispatchAction> = (
  state = initialState,
  action,
) => {
  if (action.type === ActionType.updateCounter) {
    return { ...state, ...action.payload };
  }
  return state;
};

export class RootDispatcher {
  private readonly dispatch: Dispatch<DispatchAction>;
  constructor(dispatch: Dispatch<DispatchAction>) {
    this.dispatch = dispatch;
  }
  // 公共的action
  updateCounter = (counter: number) =>
    this.dispatch({ type: ActionType.updateCounter, payload: { counter } }); // demo
}
