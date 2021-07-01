import { createStore } from 'redux';

const initialState = {
  todos: [],
  isLoading: false,
  hasError: false,
  isInitialized: false,

  currentUser: null,
};

const SET_TODOS = 'SET_TODOS';
const SET_ERROR = 'SET_ERROR';
const ENABLE_LOADING = 'ENABLE_LOADING';
const DISABLE_LOADING = 'DISABLE_LOADING';
const INITIALIZE = 'INITIALIZE';
const CANCEL_INITIALIZATION = 'CANCEL_INITIALIZATION';

export const actions = {
  setError: (hasError) => ({
    type: SET_ERROR,
    payload: hasError,
  }),
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
  initialize: () => ({ type: INITIALIZE }),
  cancelInitialization: () => ({
    type: CANCEL_INITIALIZATION,
  }),
};

export const selectors = {
  getTodos: state => state.todos,
  isLoading: state => state.isLoading,
  isInitialized: state => state.isInitialized,
  hasError: state => state.hasError,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case INITIALIZE:
      return {
        ...state,
        isInitialized: true,
      };
    case CANCEL_INITIALIZATION:
      return {
        ...state,
        isInitialized: false,
      };
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
    case SET_ERROR:
      return {
        ...state,
        hasError: action.payload,
      };

    default:
      return state;
  }
};

const store = createStore(reducer);

export default store;
