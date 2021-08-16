import { combineReducers } from 'redux';
import playerReducer from './playerReducer';
// IMPORTAR REDUCERS QUE FOREM SENDO CRIADOS

const rootReducer = combineReducers({
  playerReducer,
});

export default rootReducer;
