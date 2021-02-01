import {
  LOGIN_USER,
  REGISTER_USER,
  AUTH_USER,
  LOGOUT_USER,
} from "../_actions/types";

//state + action => nextSate로 변경
export default function (state = {}, action) {
  switch (action.type) {
    case LOGIN_USER:
      console.log("reducer: ", action.payload);
      return { ...state, loginSuccess: action.payload }; //... : spread operator. 똑같이 가져옴
    case REGISTER_USER:
      console.log("reducer: ", action.payload);
      return { ...state, register: action.payload };
    case AUTH_USER:
      console.log("reducer: ", action.payload);
      return { ...state, userData: action.payload };
    case LOGOUT_USER:
      return { ...state };
    default:
      return state;
  }
}
