import { createStore, applyMiddleware } from 'redux'
import promiseMiddleware from 'redux-promise-middleware';
import rootReducer from '../reducers'
import { FETCH_POSTS_FULFILLED } from '../actions/post';
import { API_BASE_URL, REQUEST_HEADER } from '../constants';

const postResolver = store => next => action => {
  if (action.type === FETCH_POSTS_FULFILLED) {
    const posts = action.payload;
    const comments = posts.map(({ id }) =>
      fetch(`${API_BASE_URL}/posts/${id}/comments`, REQUEST_HEADER)
        .then(res => res.json())
    );
    Promise.all(comments)
    .then(comments => posts.map((post, i) => {
      post.comments = comments[i];
      return post;
    }))
    .then(posts => next({
      type: FETCH_POSTS_FULFILLED,
      payload: posts,
    }))
  } else {
    next(action);
  }
}

export default function configureStore() {
  return createStore(
    rootReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
    applyMiddleware(
      postResolver,
      promiseMiddleware()
    )
  )
}