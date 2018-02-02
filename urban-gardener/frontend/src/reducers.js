import { combineReducers } from 'redux';
// import { SET_CURRENT_USER, LOGOUT_USER } from './actions/types';

const authReducer = (state = {currentUser: {}}, action) => {
  switch (action.type) {
    case 'SET_CURRENT_USER':
      return { currentUser: { id: action.payload.id, username: action.payload.id } };
    case 'LOGOUT_USER':
      return {currentUser: {} };
    default:
      return state;
  }
};

const userReducer = (state = {listings: [], conversations: []}, action) => {
  switch (action.type) {
    case 'SET_CURRENT_USER':
      return Object.assign({}, {listings: []}, {conversations: []}, action.payload);
    case 'LOGOUT_USER':
      return {listings: [], conversations: []};
    case 'DELETE_LISTING':
      const filteredListings = state.listings.filter(l => l.id !== action.id)
      return Object.assign({}, state, {listings: filteredListings});
    case 'ADD_LISTING_TO_USER':
      const newListings = state.listings.slice()
      newListings.push(action.listing)
      return Object.assign({}, state, {listings: newListings});
    default:
      return state;
  }
};

const loginErrorReducer = (state = false, action) => {
  switch (action.type) {
    case 'SET_CURRENT_USER':
      return false;
    case 'SET_LOGIN_ERROR':
      return true;
    default:
      return state;
  }
};

const listingErrorReducer = (state = false, action) => {
  switch (action.type) {
    case 'ADD_LISTING_TO_USER':
      return false;
    case 'SET_CREATE_LISTING_ERROR_TRUE':
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
//     case FETCH_PAINTINGS:
//       return [...action.payload];
//     case DELETE_PAINTING:
//       return state.filter(painting => painting.id !== action.id);
//     case FILTER_BY_MUSEUM:
//       return state.filter(painting => painting.museum.name === 'National Gallery of Art, Washington D.C.');
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
  user: userReducer,
  loginError: loginErrorReducer,
  registerError: registerErrorReducer,
  listingError: listingErrorReducer,
  // paintings: paintingsReducer,
  // activePaintingId: activePaintingIdReducer,
});

export default rootReducer;
