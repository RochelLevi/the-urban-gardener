import { combineReducers } from 'redux';
// import { SET_CURRENT_USER, LOGOUT_USER } from './actions/types';

const authReducer = (state = {currentUser: {}}, action) => {
  switch (action.type) {
    case 'SET_CURRENT_USER':
      const { id, username } = action.user;
      return { currentUser: { id, username } };
    case 'LOGOUT_USER':
      return {currentUser: {} };
    default:
      return state;
  }
};

const loginErrorReducer = (state = false, action) => {
  switch (action.type) {
    case 'SET_CURRENT_USER':
      const { id, username } = action.user;
      return false;
    case 'SET_LOGIN_ERROR':
      return true;
    default:
      return state;
  }
};

const registerErrorReducer = (state = {isError: false, errors: []}, action) => {
  switch (action.type) {
    case 'SET_REGISTER_ERROR_TRUE':
      return ({isError: true, errors: action.errors });
    case 'SET_REGISTER_ERROR_FALSE':
      return {isError: false, errors: {}};
    default:
      return state;
  }
};


// const listingsReducer = (state = [], action) => {
//   switch (action.type) {
    // case FETCH_PAINTINGS:
    //   return [...action.payload];
    // case DELETE_PAINTING:
    //   return state.filter(painting => painting.id !== action.id);
    // case FILTER_BY_MUSEUM:
    //   return state.filter(painting => painting.museum.name === 'National Gallery of Art, Washington D.C.');
//     default:
//       return state;
//   }
// };

// const activeListingIdReducer = (state = null, action) => {
//   switch (action.type) {
    // case SELECT_ACTIVE_PAINTING:
    //   return action.id;
    // case DELETE_PAINTING:
    //   return 1;
    // case FETCH_PAINTINGS:
    //   const index = Math.floor(Math.random() * action.payload.length)
    //   return action.payload[index].id;
//     default:
//       return state;
//   }
// };

const rootReducer = combineReducers({
  auth: authReducer,
  loginError: loginErrorReducer,
  registerError: registerErrorReducer
  // paintings: paintingsReducer,
  // activePaintingId: activePaintingIdReducer,
});

export default rootReducer;
