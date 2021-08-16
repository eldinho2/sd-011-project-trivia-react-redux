import { LOGIN, GET_SCORE } from '../actions';

const INITIAL_STATE = {
  name: '',
  email: '',
  score: 0,
  assertions: 0,
};

function playerReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case LOGIN:
    return { ...state, name: action.name, email: action.email };
  case GET_SCORE:
    return { ...state, score: action.score, assertions: action.assertions };
  default:
    return state;
  }
}
export default playerReducer;
