import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import todosReducer, {
   selectors as todosSelectors,
   actions as todosActions,
} from './todos';

import currentUserReducer, { 
  selectors as userSelectors,
  actions as userActions,
} from './currentUser';

import * as api from '../api';

export const selectors = {
  getTodos: state => todosSelectors.getTodos(state.todos),
  areTodosLoading: state => todosSelectors.isLoading(state.todos),
  hasTodosError: state => todosSelectors.hasError(state.todos),
  areTodosInitialized: state => todosSelectors.isInitialized(state.todos),

  getUser: state => userSelectors.getUser(state.currentUser),
  isUserLoading: state => userSelectors.isLoading(state.currentUser),
  hasUserError: state => userSelectors.hasError(state.currentUser),
  areUserInitialized: state => userSelectors.isInitialized(state.currentUser),
}

export const actions = {
  loadTodos: () => {
    return async (dispatch) => {
      dispatch(todosActions.enableLoading());
      dispatch(todosActions.setError(false));
  
      try {
        const todosFromServer = await api.getTodos();
        const action = todosActions.setTodos(todosFromServer)
        dispatch(action);
        dispatch(todosActions.initialized());
      } catch(error) {
          dispatch(todosActions.setError(true));
      } finally { 
          dispatch(todosActions.disableLoading());
      }
    };
  },

  showUser: (userId) => {
    return async (dispatch) => {
      dispatch(userActions.enableLoading());
      dispatch(userActions.setError(false));

      try {
        const userFromServer = await api.getUser(userId)
        const action = userActions.setUser(userFromServer);
        dispatch(action);
        dispatch(userActions.initialized());
      } catch (error) {
        dispatch(userActions.setError(true));
      } finally {
        dispatch(userActions.disableLoading());
      }
    };
  },

  clearTodos: () => {
    return (dispatch) => {
      const action = todosActions.setTodos([]);
      dispatch(action);
      dispatch(todosActions.cancelInitialized());
    };
  },

  clearUser: () => {
    return (dispatch) => {
      const action = userActions.setUser(null);
      dispatch(action);
      dispatch(userActions.cancelInitialized());
    };
  },

}

const reducer = combineReducers({
  todos: todosReducer,
  currentUser: currentUserReducer,
})

const store = createStore(
  reducer,
  applyMiddleware(thunk)
);

export default store;
