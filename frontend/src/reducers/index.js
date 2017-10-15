import { combineReducers } from 'redux';
import categories from './category';
import posts from './post';
import app from './app';

const rootReducer = combineReducers({
    app,
    categories,
    posts,
  });
  
export default rootReducer;