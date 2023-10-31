/* eslint-disable @typescript-eslint/no-unused-vars */
import axios from 'axios';
import {AnyAction, Dispatch, ThunkAction} from '@reduxjs/toolkit';
import {RootState} from '../../types/types';

export const REQUEST = 'REQUEST';
export const SUCCESS = 'SUCCESS';
export const FAILURE = 'FAILURE';

export const fetchDataRequest = (endpoint: string) => ({
  type: REQUEST,
  endpoint,
});

export const fetchDataSuccess = (endpoint: string, data: any) => ({
  type: SUCCESS,
  endpoint,
  payload: data,
});

export const fetchDataFailure = (endpoint: string, error: any) => ({
  type: FAILURE,
  endpoint,
  payload: error,
});

export const fetchData = (endpoint: string) => {
  return (dispatch: Dispatch, getState: () => RootState) => {
    dispatch(fetchDataRequest(endpoint));
    // Perform async operation
    axios
      .get(endpoint)
      .then(response => {
        dispatch(fetchDataSuccess(endpoint, response.data));
      })
      .catch(error => {
        dispatch(fetchDataFailure(endpoint, error.message));
      });
  };
};

export const login = (
  endpoint: string,
  username: string,
  password: string,
  customHeaders: {[key: string]: string} = {},
): ThunkAction<void, RootState, unknown, AnyAction> => {
  return async (dispatch: any, getState: () => RootState) => {
    try {
      dispatch({type: REQUEST});

      const headers = {
        'Content-Type': 'application/json',
        ...customHeaders, // Include any custom headers passed to the action
      };

      const response = await axios.post(
        endpoint,
        {username, password},
        {headers},
      );

      if (response.data.token) {
        dispatch({type: SUCCESS, payload: username});
      } else {
        dispatch({type: FAILURE, payload: 'Invalid credentials'});
      }
    } catch (error) {
      dispatch({type: FAILURE, payload: 'An error occurred'});
    }
  };
};
