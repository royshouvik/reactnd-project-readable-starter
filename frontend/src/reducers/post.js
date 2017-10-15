import { FETCH_POSTS_PENDING, FETCH_POSTS_FULFILLED, FETCH_POSTS_REJECTED } from '../actions/post';

const initialState = {
    isFetching: false,
    isEmpty: false,
    data: []
  };
  
const posts = ( state = initialState,  action) => {
  switch (action.type) {
    case FETCH_POSTS_PENDING:
      return Object.assign({}, state, { isFetching: true });

    case FETCH_POSTS_FULFILLED:
      return Object.assign({}, state, {
          isFetching: false,
          isEmpty: (action.payload.length === 0),
          data: action.payload,
      });

    case FETCH_POSTS_REJECTED:
      return Object.assign({}, state, { isFetching: false });

    default:
      return state;
  }
};

export default posts;


