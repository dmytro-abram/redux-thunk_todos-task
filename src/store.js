import { createStore } from 'redux';

const initialState = {
  x: 1,
};

const someAction = {
  type: 'DO_SOMETHING',
  payload: 'Action data',
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'DO_SOMETHING':
      return {
        ...state,
        x: state.x + 1,
      };

    default:
      return state;
  }
};

const store = createStore(reducer);

store.subscribe(() => {
  console.log(store.getState());
});

store.dispatch(someAction);
store.dispatch(someAction);
store.dispatch(someAction);
store.dispatch(someAction);
store.dispatch(someAction);

export default store;
