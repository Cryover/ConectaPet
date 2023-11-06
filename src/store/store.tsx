import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { loginApi } from './slices/loginSlice';
import { usuarioApi } from './slices/usuarioSlice';
import { despesaApi } from './slices/despesaSlice';
import { petApi } from './slices/petSlice';
import { consultaApi } from './slices/consultaSlice';
import { compromissoApi } from './slices/compromissoSlice';

/* const rootReducer = combineReducers({
  [apiSlice1Reducers]: ApiSlice1State,
  [apiSlice2Reducers]: ApiSlice2State,
});


const store = configureStore({
  reducer: {
    [loginApi.reducerPath]: loginApi.reducer,
    [usuarioApi.reducerPath]: usuarioApi.reducer,
    [petApi.reducerPath]: petApi.reducer,
    [despesaApi.reducerPath]: despesaApi.reducer,
    [consultaApi.reducerPath]: consultaApi.reducer,
    [compromissoApi.reducerPath]: compromissoApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(loginApi.middleware, usuarioApi.middleware, petApi.middleware, despesaApi.middleware, consultaApi.middleware, compromissoApi.middleware),
}); */

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

