import { combineReducers } from "redux";
import user from "./user_reducer";
//import comment from './comment_reducer';

//user, comment reducer 등을 하나로 모아 관리하게 해줌
const rootReducer = combineReducers({
  user,
});

export default rootReducer;
