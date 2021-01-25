import { LOGIN_USER, REGISTER_USER } from "../_actions/types";

//state + action => nextSate로 변경
export default function (state = {}, action) {
  switch (action.type) {
    case LOGIN_USER:
      console.log("reducer: ", action.payload);
      return { ...state, loginSuccess: action.payload }; //... : spread operator. 똑같이 가져옴
    case REGISTER_USER:
      console.log("reducer: ", action.payload);
      return { ...state, registerSuccess: action.payload };
    default:
      return state;
  }
}
