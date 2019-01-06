import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunkMiddleware from 'redux-thunk';
import { setToken, unsetToken } from 'utils/auth';

const initState = {
  lastUpdate: 0,
  user: {},
  loggedIn: false,
  info: {
    'COMMON': {}
  }
}

const LOGGED_OUT = 'LOGGED_OUT';
const SET_INFO = 'SET_INFO';
const SET_CLOCK = 'SET_CLOCK';
const SET_USER_INFO = 'SET_USER_INFO';

/**
 * REDUX : ACTION HANDLE
 */
const actionHandlers = {
  [SET_CLOCK]: (state, action) => ({ ...state, lastUpdate: action.payload }),
  [SET_INFO]: (state, action) => ({ ...state, info: { ...state.info, ...action.payload } }),
  [SET_USER_INFO]: (state, action) => ({ ...state, loggedIn: true, user: action.payload }),
  [LOGGED_OUT]: (state) => ({ ...state, user: {}, loggedIn: false })
}

/**
 * REDUX : ACTION
 */
export const setClock = () => ({
  type: SET_CLOCK,
  payload: Date.now()
})

export const setInfo = (data) => ({
  type: SET_INFO,
  payload: data
})

export const setUserInfo = (data) => ({
  type: SET_USER_INFO,
  payload: data
})

export const requestLogin = (token, user) => {
  setToken(token);
  return (dispatch) => {
    dispatch(setUserInfo(user));
  }
}

export const requestLogout = () => {
  unsetToken();
  return { type: LOGGED_OUT };
}
/**
 * REDUX : STORE
 */

function createReducer(initialState, actionHandlers) {
  return (state = initialState, action) => {
    const reduceFn = actionHandlers[action.type];
    if (!reduceFn) return state;
    return { ...state, ...reduceFn(state, action) };
  };
}

export const initStore = (initialState = initState) => {
  return createStore(createReducer(initState, actionHandlers), initialState, composeWithDevTools(applyMiddleware(thunkMiddleware)))
}