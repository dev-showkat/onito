// store.js
import { createStore } from 'redux';
import userReducer from './reducers';

export const store = createStore(userReducer);