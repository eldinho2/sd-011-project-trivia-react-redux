import * as actions from '../actions';

const INITIAL_STATE = {
  name: '',
  email: '',
  score: 0,
  token: '',
};

export default function reducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case actions.REQUEST_TOKEN_SUCCESS:
    return { ...state, token: action.payload };
  case actions.STORE_LOGIN_EMAIL:
    return { ...state, name: action.payload.name, email: action.payload.email };
  default:
    return state;
  }
}
