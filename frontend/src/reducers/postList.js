import {
  FETCH_POSTS_PENDING,
  FETCH_POSTS_FULFILLED,
  FETCH_POSTS_REJECTED,
  VOTE_POST_FULFILLED,
  EDIT_POST_FULFILLED,
  DELETE_POST_FULFILLED
} from "../actionTypes/post";

const initialState = {
  isFetching: false,
  isEmpty: false,
  data: []
};

const posts = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_POSTS_PENDING:
      return Object.assign({}, state, { isFetching: true });

    case FETCH_POSTS_FULFILLED:
      return Object.assign({}, state, {
        isFetching: false,
        isEmpty: action.payload.length === 0,
        data: action.payload
      });

    case FETCH_POSTS_REJECTED:
      return Object.assign({}, state, { isFetching: false });

    case VOTE_POST_FULFILLED:
      return Object.assign({}, state, {
        data: state.data.map(post => {
          const { id, voteScore } = action.payload;
          if (post.id === id) {
            return Object.assign({}, post, { voteScore });
          } else {
            return post;
          }
        })
      });
    case EDIT_POST_FULFILLED:
      return Object.assign({}, state, {
        data: state.data.map(post => {
          const { id } = action.payload;
          if (post.id === id) {
            return action.payload;
          } else {
            return post;
          }
        })
      });
    case DELETE_POST_FULFILLED:
      return Object.assign({}, state, {
        data: state.data.filter(post => post.id !== action.payload.id)
      });

    default:
      return state;
  }
};

export default posts;
