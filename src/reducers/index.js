import { combineReducers } from 'redux';
import auth from './auth';
import navigation from './navigation';
import quotes from './quote';

const rootReducer = combineReducers({ auth, navigation, quotes });

export default rootReducer;
