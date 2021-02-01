import axios from "axios";
import { LOGIN_USER, REGISTER_USER, AUTH_USER, LOGOUT_USER } from "./types";
import { USER_SERVER } from "../components/Config.js";

export function registerUser(dataToSubmit) {
  //서버에서 받은 데이터를 request에 저장
  const request = axios
    .post(`${USER_SERVER}/register`, dataToSubmit)
    .then((response) => response.data);
  console.log("register-request: ", request); //promise
  //reducer로 보내 nextState을 만든다.
  return {
    type: REGISTER_USER,
    payload: request,
  };
}

export function loginUser(dataToSubmit) {
  //서버에서 받은 데이터를 request에 저장
  const request = axios
    .post(`${USER_SERVER}/login`, dataToSubmit)
    .then((response) => response.data);
  console.log("loginUser-request: ", request); //promise
  //reducer로 보내 nextState을 만든다.
  return {
    type: LOGIN_USER,
    payload: request,
  };
}

export function auth() {
  //서버에서 받은 데이터를 request에 저장
  const request = axios
    .get(`${USER_SERVER}/auth`)
    .then((response) => response.data);
  //reducer로 보내 nextState을 만든다.
  return {
    type: AUTH_USER,
    payload: request,
  };
}

export function logoutUser() {
  const request = axios
    .get(`${USER_SERVER}/logout`)
    .then((response) => response.data);

  return {
    type: LOGOUT_USER,
    payload: request,
  };
}
