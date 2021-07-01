const initialState = {
  items: [],
  isLoading: false,
  isInitialized: false,
  hasError: false,
};

const SET_TODOS = 'todos/SET_TODOS';
const SET_ERROR = 'SET_ERROR';
const ENABLE_LOADING = 'todos/ENABLE_LOADING';
const DISABLE_LOADING = 'todos/DISABLE_LOADING';
const INITIALIZE = 'todos/INITIALIZE';
const CANCEL_INITIALIZATION = 'todos/CANCEL_INITIALIZATION';

export const actions = {
  setTodos: (todos) => ({
    type: SET_TODOS,
    payload: todos,
  }),
  setError: (hasError) => ({
    type: SET_ERROR,
    payload: hasError,
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
  getTodos: state => state.items,
  isLoading: state => state.isLoading,
  isInitialized: state => state.isInitialized,
  hasError: state => state.hasError,
};

export default (state = initialState, action) => {
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
        items: action.payload,
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
