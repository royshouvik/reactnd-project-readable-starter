import {
  FETCH_POSTS_PENDING,
  FETCH_POSTS_FULFILLED,
  FETCH_POST_FULFILLED,
  FETCH_POSTS_REJECTED,
  VOTE_POST_FULFILLED,
} from '../actions/post';

const initialState = {
    isFetching: false,
    isEmpty: false,
    data: [],
    activePost: null,
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
    case FETCH_POST_FULFILLED:
      return Object.assign({}, state, {
          activePost: action.payload,
      });

    case FETCH_POSTS_REJECTED:
      return Object.assign({}, state, { isFetching: false });

    case VOTE_POST_FULFILLED:
      return Object.assign({}, state,
        {
          data: state.data.map(post => {
            const { id, voteScore } = action.payload;
            if (post.id === id) {
              return Object.assign({}, post, { voteScore });
            } else {
              return post;
            }
          })
        } 
      )

    default:
      return state;
  }
};

export default posts;


