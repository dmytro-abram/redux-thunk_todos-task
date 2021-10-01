const initialState = {
  value: null,
  hasError: false,
  isLoading: false,
  isInitialized: false,
};

//action type
const SET_USER = 'currentUser/SET_USER';
const SET_ERROR = 'currentUser/SET_ERROR';
const ENABLE_LOADING = 'currentUser/ENABLE_LOADING';
const DISABLE_LOADING = 'currentUser/DISABLE_LOADING';
const INITIALIZED = 'currentUser/INITIALIZED';
const CANCEL_INITIALIZED = 'currentUser/CANCEL_INITIALIZED';

//action creator
export const actions = {
  setUser: (user) => ({
    type: SET_USER,
    payload: user,
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
  getUser: state => state.value,
  isLoading: state => state.isLoading,
  isInitialized: state => state.isInitialized,
  hasError: state => state.hasError,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        value: action.payload
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