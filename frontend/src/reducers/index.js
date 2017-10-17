import { combineReducers } from 'redux';
import categories from './category';
import posts from './postList';
import postDetail from './postDetail';
import app from './app';

const rootReducer = combineReducers({
    app,
    categories,
    posts,
    postDetail,
  });
  
export default rootReducer;