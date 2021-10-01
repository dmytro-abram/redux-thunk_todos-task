import { createStore } from 'redux';

const initialState = {
  hasError: false,
  isLoading: false,
  isInitialized: false,
  todos: [],
};

//action type
const SET_TODOS = 'SET_TODOS';
const ENABLE_LOADING = 'ENABLE_LOADING';
const DISABLE_LOADING = 'DISABLE_LOADING';
const ENABLE_ERROR = 'ENABLE_ERROR';
const DISABLE_ERROR = 'DISABLE_ERROR';
const ENABLE_INITIALIZED = 'ENABLE_INITIALIZED';
const DISABLE_INITIALIZED = 'DISABLE_INITIALIZED';


//action creator
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

  enableError: () => ({
    type: ENABLE_ERROR,
  }),

  disableError: () => ({
    type: DISABLE_ERROR,
  }),
  enableInitialized: () => ({
    type: ENABLE_INITIALIZED,
  }),

  disableInitialized: () => ({
    type: DISABLE_INITIALIZED,
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
    case SET_TODOS:
      return {
        ...state,
        todos: action.payload
      }

    case ENABLE_LOADING:
      return {
        ...state,
        isLoading: true,
      }

    case DISABLE_LOADING:
      return {
        ...state,
        isLoading: false,
      }

    case ENABLE_ERROR:
      return {
        ...state,
        hasError: true,
      }

    case DISABLE_ERROR:
      return {
        ...state,
        hasError: false,
      }

    case ENABLE_INITIALIZED:
      return {
        ...state,
        isInitialized: true,
      }

    case DISABLE_INITIALIZED:
      return {
        ...state,
        isInitialized: false,
      }
    default: return state;
  }
};

const store = createStore(
  reducer,
  initialState
);

export default store;
