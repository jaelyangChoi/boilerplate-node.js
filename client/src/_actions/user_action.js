import axios from "axios";
import { LOGIN_USER } from "./types";

export function loginUser(dataToSubmit) {
  //서버에서 받은 데이터를 request에 저장
  const request = axios
    .post("/api/users/login", dataToSubmit)
    .then((response) => response.data);
  console.log("loginUser-request: ", request); //promise
  //reducer로 보내 nextState을 만든다.
  return {
    type: LOGIN_USER,
    payload: request,
  };
}
