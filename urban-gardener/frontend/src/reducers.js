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

const listingsReducer = (state = [], action) => {
  switch (action.type) {
    case 'GET_LISTINGS':
      return action.payload ;
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
    case 'ADD_MESSAGE_TO_USER':
      const newConversations = state.conversations.slice()
      newConversations.forEach(c => c.id === action.message.conversation_id ? c.messages.push(action.message) : null)
      return Object.assign({}, state, {conversations: newConversations});
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


const listingsFiltersReducer = (state = {}, action) => {
  switch (action.type) {
    case 'CHANGE_LISTING_FILTER':
      return Object.assign({}, state, action.filter);
    default:
      return state;
  }
};

function filteredListings(listings, filters){
  return listings.filter( (l) => {
    console.log(l.distance_value * 0.000621371)
    console.log(filters.distance_miles)
    return (
      (filters.garden_type ? l.desired_garden_type === filters.garden_type : true) &&
      (filters.compensation_type ? l.compensation_type === filters.compensation_type : true) &&
      (filters.location && filters.distance_miles ? parseFloat(parseFloat(l.distance_value) * 0.000621371 )< parseFloat(filters.distance_miles) : true)
  )}
)}

//think about resetting this
const filteredListingsReducer = (state = {listings: [], filtered: false}, action) => {
  switch (action.type) {
    case 'FILTER_LISTINGS':
      return {listings: filteredListings(action.listings, action.filters), filtered: true}
    // case 'UPDATE_FILTERED_LISTINGS_WITH_LOCATION':
    //   return {listings: action.payload, filtered: true}
    default:
      return state;
  }
};


const rootReducer = combineReducers({
  auth: authReducer,
  user: userReducer,
  loginError: loginErrorReducer,
  registerError: registerErrorReducer,
  listingError: listingErrorReducer,
  listings: listingsReducer,
  listingsFilters: listingsFiltersReducer,
  filteredListings: filteredListingsReducer
  // paintings: paintingsReducer,
  // activePaintingId: activePaintingIdReducer,
});

export default rootReducer;
