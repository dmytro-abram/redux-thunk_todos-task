import {
  createStore,
  combineReducers,
  applyMiddleware
} from 'redux';
import thunk from 'redux-thunk';

import todosReducer, {
  selectors as todosSelectors,
  actions as todosActions,
} from './todos';

import currentUserReducer, { selectors as userSelectors } from './currentUser';

import * as api from '../api';


export const selectors = {
  getTodos: state => todosSelectors.getTodos(state.todos),
  areTodosLoading: state => todosSelectors.isLoading(state.todos),
  hasTodosError: state => todosSelectors.hasError(state.todos),
  areTodosInitialized: state => todosSelectors.isInitialized(state.todos),

  isUserLoading: state => userSelectors.isLoading(state.currentUser),
};

export const actions = {
  loadTodos: () => {
    return async (dispatch) => {
      dispatch(todosActions.enableLoading());
      dispatch(todosActions.setError(false));

      try {
        const todosFromServer = await api.getTodos();

        dispatch(todosActions.setTodos(todosFromServer));
        dispatch(todosActions.initialize());
      } catch (error) {
        dispatch(todosActions.setError(true));
      } finally {
        dispatch(todosActions.disableLoading());
      }

      return 123;
    };
  },
  clearTodos: () => {
    return (dispatch) => {
      dispatch(todosActions.setTodos([]));
      dispatch(todosActions.cancelInitialization());
    };
  },
};

const reducer = combineReducers({
  todos: todosReducer,
  currentUser: currentUserReducer,
});

const store = createStore(
  reducer,
  applyMiddleware(thunk),
);

export default store;
