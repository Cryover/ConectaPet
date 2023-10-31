// store.js
import {configureStore, combineReducers} from '@reduxjs/toolkit';
import {dataReducer} from './reducers/reducers';
import thunk from 'redux-thunk';

const rootReducer = combineReducers({
  data: dataReducer,
});

const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(thunk),
});

export default store;
