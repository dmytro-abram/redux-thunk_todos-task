const initialState = {
  value: null,
  isLoading: false,
  isInitialized: false,
  hasError: false,
};

const SET_USER = 'currentUser/SET_USER';
const SET_ERROR = 'SET_ERROR';
const ENABLE_LOADING = 'currentUser/ENABLE_LOADING';
const DISABLE_LOADING = 'currentUser/DISABLE_LOADING';
const INITIALIZE = 'currentUser/INITIALIZE';
const CANCEL_INITIALIZATION = 'currentUser/CANCEL_INITIALIZATION';

export const actions = {
  setUser: (user) => ({
    type: SET_USER,
    payload: user,
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
  getUser: state => state.value,
  hasUser: state => !!state.value,
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
    case SET_USER:
      return {
        ...state,
        value: action.payload,
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
