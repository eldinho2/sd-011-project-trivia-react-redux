import { GET_TOKEN, GET_TOKEN_SUCCESS, GET_TOKEN_FAILED,
 GET_QUESTIONS, GET_QUESTIONS_SUCCESS, GET_QUESTIONS_FAILED, getQuestionsThunk } from '../actions';

const INITIAL_STATE = {
  token: '',
  loading: true,
  score: 0,
  questions: [],
};

const game = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case GET_TOKEN:
    localStorage.clear();
    return {
      ...state,
    };
  case GET_TOKEN_SUCCESS:
    localStorage.setItem('token', action.payload.token);
    return { ...state,
      token: action.payload.token,
      loading: false,
    };
  case GET_TOKEN_FAILED:
    return { ...state, error: action.payload };
  case GET_QUESTIONS:
    return {
      ...state, loading: true,
    };
  case GET_QUESTIONS_SUCCESS:
    return { ...state,
      questions: action.payload,
      loading: false,
    };
  case GET_QUESTIONS_FAILED:
    return { ...state, error: action.payload };
  default:
    return state;
  }
};

export default game;
