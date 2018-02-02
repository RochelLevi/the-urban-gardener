import { adapter } from '../services';
import {ASYNC_START, SET_CURRENT_USER, LOGOUT_USER, SET_LOGIN_ERROR, REGISTER_NEW_USER,
    SET_REGISTER_ERROR_TRUE, SET_REGISTER_ERROR_FALSE, DELETE_LISTING, SET_CREATE_LISTING_ERROR_TRUE,
    ADD_LISTING_TO_USER} from './types';

export const fetchUser = () => dispatch => {
  dispatch({ type: ASYNC_START });
  adapter.auth.getCurrentUser().then(user => {
    dispatch({ type: SET_CURRENT_USER, payload: user });
  });
};

export const deleteListing = (id) => dispatch => {
  dispatch({ type: ASYNC_START });
  adapter.deleteListing(id).then(data => {
    data.errors ? null : dispatch({ type: DELETE_LISTING, id: id });
  });
};


export const loginUser = (email, password, history) => dispatch => {
  dispatch({ type: ASYNC_START });

  adapter.auth.login({ email, password }).then(user => {
    if (user.jwt){
      localStorage.setItem('token', user.jwt)
      dispatch({ type: SET_CURRENT_USER, payload: user });
      history.push('/my-profile');
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

export const createListing = (data, history) => dispatch => {
  dispatch({ type: ASYNC_START });
  console.log('in actions', data)
  adapter.createListing(data).then(listing => {
    if (listing.errors){
      dispatch({ type: SET_CREATE_LISTING_ERROR_TRUE, errors: listing.errors })
    } else{
      dispatch({ type: ADD_LISTING_TO_USER, listing: listing });
    }
  });
};


export const logoutUser = () => {
  localStorage.removeItem('token');
  return { type: LOGOUT_USER };
};
