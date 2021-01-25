import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { auth } from "../_actions/user_action";

/*optin*/
//null => 아무나 출입이 가능한 페이지
//true => 로그인한 유저만 출입이 가능한 페이지
//false => 로그인한 유저는 출입이 불가능한 페이지
export default function (SpecificComponent, option, adminRoute = null) {
  //서버로부터 user의 상태를 받아와 권한 확인
  function AuthenticationCheck(props) {
    const dispatch = useDispatch();
    //axios.get('/api/users/auth)
    useEffect(() => {
      dispatch(auth()).then((response) => {
        console.log("AuthenticationCheck ", response);
        //로그인하지 않은 상태
        if (!response.payload.isAuth) {
          //로그인 option이면 로그인 페이지로 튕김
          if (option) props.history.push("/login");
        } else {
          //로그인한 상태
          if (adminRoute && !response.payload.isAdmin) props.history.push("/");
          else if (!option) props.history.push("/");
        }
      });
    }, []);

    return <SpecificComponent />;
  }
  return AuthenticationCheck;
}
