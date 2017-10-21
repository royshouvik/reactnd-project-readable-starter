import {
  FETCH_POST_FULFILLED,
  VOTE_POST_FULFILLED,
  EDIT_POST_FULFILLED,
  DELETE_POST_FULFILLED,
} from "../actionTypes/post";
import {
  EDIT_COMMENT_FULFILLED,
  VOTE_COMMENT_FULFILLED,
  ADD_COMMENT_FULFILLED,
  DELETE_COMMENT_FULFILLED,
} from "../actionTypes/comment";

const initialState = {
  isFetching: false,
  isEmpty: false,
  activePost: null
};

const posts = (state = initialState, action) => {
  const { activePost } = state;
  switch (action.type) {
    case FETCH_POST_FULFILLED:
    case EDIT_POST_FULFILLED:
      return Object.assign({}, state, {
        activePost: action.payload,
        isEmpty: false,
      });

    case VOTE_POST_FULFILLED:
      const { id, voteScore } = action.payload;
      
      if (activePost && activePost.id === id) {
        return Object.assign({}, state, {
          activePost: Object.assign({}, activePost, { voteScore })
        });
      }
      return state;

    case ADD_COMMENT_FULFILLED:
      const post = Object.assign({}, activePost,  { comments: [action.payload, ...activePost.comments]});
      return Object.assign({}, state, { activePost: post });

    case EDIT_COMMENT_FULFILLED:
    case VOTE_COMMENT_FULFILLED:
      const { comments } = state.activePost;
      const updatedComments = comments.map(comment => {
        if (comment.id === action.payload.id) {
          return action.payload;
        }
        return comment;
      });
      const updatedPost = Object.assign({}, state.activePost, {
        comments: updatedComments
      });
      return Object.assign({}, state, { activePost: updatedPost });
    case DELETE_POST_FULFILLED:
      return Object.assign({}, state, { activePost: null, isEmpty: true });
    case DELETE_COMMENT_FULFILLED:
      const filteredComments = state.activePost.comments.filter(
       comment => comment.id !== action.payload.id
      );
      const postWithComments = Object.assign({}, state.activePost, {
        comments: filteredComments
      });
      return Object.assign({}, state, { activePost: postWithComments });
    default:
      return state;
  }
};

export default posts;
