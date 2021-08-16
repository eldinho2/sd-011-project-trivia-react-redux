export const LOGIN = 'LOGIN';
export const GET_SCORE = 'GET_SCORE';

export function getLogin(name, email) {
  return {
    type: LOGIN,
    name,
    email,
  };
}

export function playerScore(score, assertions) {
  return {
    type: GET_SCORE,
    score,
    assertions,
  };
}
