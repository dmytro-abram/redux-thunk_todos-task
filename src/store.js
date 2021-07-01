import { createStore } from 'redux';

const initialState = {
  hasError: false,
  isLoading: false,
  isInitialized: false,
  todos: [],
  currentUser: null,
};

const SET_TODOS = 'SET_TODOS';
const ENABLE_LOADING = 'ENABLE_LOADING';
const DISABLE_LOADING = 'DISABLE_LOADING';

export const actions = {
  setTodos: (todos) => ({
    type: SET_TODOS,
    payload: todos,
  }),
  enableLoading: () => ({
    type: ENABLE_LOADING,
  }),
  disableLoading: () => ({
    type: DISABLE_LOADING,
  }),
};

export const selectors = {
  getTodos: state => state.todos,
  isLoading: state => state.isLoading,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ENABLE_LOADING:
      return {
        ...state,
        isLoading: true,
      };
    case DISABLE_LOADING:
      return {
        ...state,
        isLoading: false,
      };
    case SET_TODOS:
      return {
        ...state,
        todos: action.payload,
      };

    default:
      return state;
  }
};

const store = createStore(reducer);

export default store;
