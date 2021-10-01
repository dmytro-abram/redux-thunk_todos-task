import { createStore } from 'redux';

const initialState = {
  hasError: false,
  isLoading: false,
  isInitialized: false,
  todos: [],
};

//action type
const SET_TODOS = 'SET_TODOS';
const SET_ERROR = 'SET_ERROR';
const ENABLE_LOADING = 'ENABLE_LOADING';
const DISABLE_LOADING = 'DISABLE_LOADING';
const INITIALIZED = 'INITIALIZED';
const CANCEL_INITIALIZED = 'CANCEL_INITIALIZED';


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

  setError: (hasError) => ({
    type: SET_ERROR,
    payload: hasError,
  }),

  initialized: () => ({
    type: INITIALIZED,
  }),

  cancelInitialized: () => ({
    type: CANCEL_INITIALIZED,
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

    case SET_ERROR:
      return {
        ...state,
        hasError: action.payload,
      }

    case INITIALIZED:
      return {
        ...state,
        isInitialized: true,
      }

    case CANCEL_INITIALIZED:
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
