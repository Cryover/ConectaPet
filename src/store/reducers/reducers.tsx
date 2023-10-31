import {REQUEST, SUCCESS, FAILURE} from '../actions/actions';

const initialState = {
  data: null,
  loading: false,
  error: null,
};

export const dataReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case REQUEST:
      return {
        ...state,
        [action.endpoint]: {
          loading: true,
          data: null,
          error: null,
        },
      };
    case SUCCESS:
      return {
        ...state,
        [action.endpoint]: {
          loading: false,
          data: action.payload,
          error: null,
        },
      };
    case FAILURE:
      return {
        ...state,
        [action.endpoint]: {
          loading: false,
          data: null,
          error: action.payload,
        },
      };
    default:
      return state;
  }
};
