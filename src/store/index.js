import { createStore } from 'redux';
import todosReducer, { selectors as todosSelectors } from './todos';
import currentUserReducer, { selectors as userSelectors } from './currentUser';

export const selectors = {
  getTodos: state => todosSelectors.getTodos(state.todos),
  areTodosLoading: state => todosSelectors.isLoading(state.todos),
  hasTodosError: state => todosSelectors.hasError(state.todos),
  areTodosInitialized: state => todosSelectors.isInitialized(state.todos),

  isUserLoading: state => userSelectors.isLoading(state.currentUser),
};

const reducer = (state = {}, action) => {
  return {
    todos: todosReducer(state.todos, action),
    currentUser: currentUserReducer(state.currentUser, action),
  };
};

const store = createStore(reducer);

export default store;
