import { createContext } from 'react';

export interface TwtStateProps {
  user: object;
  items: Array<any>;
  itemCount: number | string;
  itemsLoading: boolean;
  itemLast: number | string;
}
export const defaultTwtState: TwtStateProps = {
  user: {},
  items: [],
  itemCount: 0,
  itemsLoading: true,
  itemLast: null,
};

const TwtState = createContext({});
TwtState.displayName = 'State_TwitterListContext';
export const TwtStateContext = TwtState;

const TwtDispatch = createContext({});
TwtDispatch.displayName = 'Dispatch_TwitterListContext';
export const TwtDispatchContext = TwtDispatch;

export function TwtReducer(
  state: TwtStateProps,
  action: {
    type: string;
    payload?: any;
  }
) {
  switch (action.type) {
    case 'addTwts':
      try {
        let items = action.payload?.items;
        let itemsLength = items.length;
        return {
          ...state,
          items: state.items.concat(items),
          itemCount: state.itemCount + itemsLength,
          itemLast: items[itemsLength - 1].id,
          itemsLoading: false,
        };
      } catch (e) {
        return state;
      }
    case 'loading':
      return {
        ...state,
        itemsLoading: true,
      };
    case 'reset':
      return {
        ...state,
        ...action.payload,
      };
    default:
      throw new Error();
  }
}
