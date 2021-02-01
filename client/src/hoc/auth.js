/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { auth } from "../_actions/user_actions";
import { useSelector, useDispatch } from "react-redux";

/*optin*/
//null => 아무나 출입이 가능한 페이지
//true => 로그인한 유저만 출입이 가능한 페이지
//false => 로그인한 유저는 출입이 불가능한 페이지
export default function (SpecificComponent, option, adminRoute = null) {
  //서버로부터 user의 상태를 받아와 권한 확인
  function AuthenticationCheck(props) {
    let user = useSelector((state) => state.user);
    const dispatch = useDispatch();

    useEffect(() => {
      //To know my current status, send Auth request
      dispatch(auth()).then((response) => {
        //Not Loggined in Status
        //로그인하지 않은 상태
        if (!response.payload.isAuth) {
          //로그인 option이면 로그인 페이지로 튕김
          if (option) props.history.push("/login");

          //로그인한 상태
        } else {
          //supposed to be Admin page, but not admin person wants to go inside
          if (adminRoute && !response.payload.isAdmin) {
            props.history.push("/");
          }
          //Logged in Status, but Try to go into log in page
          else {
            if (option === false) {
              props.history.push("/");
            }
          }
        }
      });
    }, []);

    return <SpecificComponent {...props} user={user} />;
  }
  return AuthenticationCheck;
}
