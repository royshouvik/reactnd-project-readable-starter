import { createStore, applyMiddleware } from 'redux'
import promiseMiddleware from 'redux-promise-middleware';
import rootReducer from '../reducers'
import { FETCH_POSTS_FULFILLED, FETCH_POST_FULFILLED} from '../actions/post';
import { API_BASE_URL, REQUEST_HEADER } from '../constants';

const fetchComment = ({ id }) => fetch(`${API_BASE_URL}/posts/${id}/comments`, REQUEST_HEADER)
  .then(res => res.json());

const commentsResolver = store => next => action => {
  switch(action.type) {
    case FETCH_POSTS_FULFILLED:
      const posts = action.payload;
      const comments = posts.map(fetchComment);

      return Promise.all(comments)
      .then(comments => posts.map((post, i) => {
        post.comments = comments[i];
        return post;
      }))
      .then(posts => next({
        type: FETCH_POSTS_FULFILLED,
        payload: posts,
      }));
    case FETCH_POST_FULFILLED:
      const post = action.payload;
      return fetchComment(post)
      .then(comments => Object.assign({}, post, { comments }))
      .then(post => next({
        type: FETCH_POST_FULFILLED,
        payload: post
      }));

    default:
     return next(action)
  } 
}

export default function configureStore() {
  return createStore(
    rootReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
    applyMiddleware(
      commentsResolver,
      promiseMiddleware()
    )
  )
}