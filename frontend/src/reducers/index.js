import { combineReducers } from 'redux';
import categories from './category';
import app from './app';

const rootReducer = combineReducers({
    app,
    categories,
  });
  
export default rootReducer;