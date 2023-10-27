import {configureStore} from '@reduxjs/toolkit';
import {Reducers} from '../reducers';
export const Store = configureStore(Reducers);
