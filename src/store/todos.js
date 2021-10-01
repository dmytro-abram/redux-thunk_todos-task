const initialState = {
  items: [],
  hasError: false,
  isLoading: false,
  isInitialized: false,
};

//action type
const SET_TODOS = 'todos/SET_TODOS';
const SET_ERROR = 'todos/SET_ERROR';
const ENABLE_LOADING = 'todos/ENABLE_LOADING';
const DISABLE_LOADING = 'todos/DISABLE_LOADING';
const INITIALIZED = 'todos/INITIALIZED';
const CANCEL_INITIALIZED = 'todos/CANCEL_INITIALIZED';


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
  getTodos: state => state.items,
  isLoading: state => state.isLoading,
  isInitialized: state => state.isInitialized,
  hasError: state => state.hasError,
};


export default (state = initialState, action) => {
  switch (action.type) {
    case SET_TODOS:
      return {
        ...state,
        items: action.payload
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