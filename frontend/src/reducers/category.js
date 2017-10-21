import {
  FETCH_CATEGORIES_PENDING,
  FETCH_CATEGORIES_FULFILLED,
  FETCH_CATEGORIES_REJECTED,
} from '../actionTypes/category';

const initialState = {
    isFetching: false,
    isEmpty: false,
    data: []
  };
  
const categories = ( state = initialState,  action) => {
  switch (action.type) {
    case FETCH_CATEGORIES_PENDING:
      return Object.assign({}, state, { isFetching: true });

    case FETCH_CATEGORIES_FULFILLED:
      return Object.assign({}, state, {
          isFetching: false,
          isEmpty: (action.payload.length === 0),
          data: action.payload && action.payload.categories,
      });

    case FETCH_CATEGORIES_REJECTED:
      return Object.assign({}, state, { isFetching: false });

    default:
      return state;
  }
};

export default categories;


