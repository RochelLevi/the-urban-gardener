import { adapter } from '../services';
import {ASYNC_START, SET_CURRENT_USER, LOGOUT_USER, SET_LOGIN_ERROR, REGISTER_NEW_USER,
    SET_REGISTER_ERROR_TRUE, SET_REGISTER_ERROR_FALSE} from './types';

export const fetchUser = () => dispatch => {
  dispatch({ type: ASYNC_START });
  adapter.auth.getCurrentUser().then(user => { console.log('user resp', user);
    dispatch({ type: SET_CURRENT_USER, user });
  });
};

export const loginUser = (email, password, history) => dispatch => {
  dispatch({ type: ASYNC_START });

  adapter.auth.login({ email, password }).then(user => {
    if (user.jwt){
      localStorage.setItem('token', user.jwt)
      dispatch({ type: SET_CURRENT_USER, user });
      history.push('/profile');
    } else{
      dispatch({ type: SET_LOGIN_ERROR, user })
    }
  });
};

export const registerUser = (data, history) => dispatch => {
  dispatch({ type: ASYNC_START });

  adapter.register(data).then(user => {
    if (user.errors){
      dispatch({ type: SET_REGISTER_ERROR_TRUE, errors: user.errors })
    } else{
      dispatch({ type: SET_REGISTER_ERROR_FALSE });
      history.push('/login');
    }
  });
};

export const logoutUser = () => {
  localStorage.removeItem('token');
  return { type: LOGOUT_USER };
};
