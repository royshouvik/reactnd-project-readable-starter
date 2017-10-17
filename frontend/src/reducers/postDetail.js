import {
    FETCH_POST_FULFILLED,
    VOTE_POST_FULFILLED,
  } from '../actions/post';
  
  const initialState = {
      isFetching: false,
      isEmpty: false,
      activePost: null,
    };
    
  const posts = ( state = initialState,  action) => {
    switch (action.type) {

      case FETCH_POST_FULFILLED:
        return Object.assign({}, state, {
            activePost: action.payload,
        });
  
      case VOTE_POST_FULFILLED:
        const { id, voteScore } = action.payload;
        if (id === state.activePost.id) {
            return Object.assign({}, state, { 
                activePost: Object.assign({}, state.activePost, { voteScore })
            });
        }
        return state;
  
      default:
        return state;
    }
  };
  
  export default posts;
  
  
  