import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { loginUser } from "../../../_actions/user_action";

function LoginPage(props) {
  const dispatch = useDispatch();

  //state
  const [Email, setEmail] = useState(""); //initioal State
  const [Password, setPassword] = useState("");

  //event 발생하면 state 변경
  const onEmailHandler = (event) => {
    setEmail(event.currentTarget.value);
  };
  const onPasswordHandler = (event) => {
    setPassword(event.currentTarget.value);
  };

  const onSubmitHandler = (event) => {
    event.preventDefault(); //페이지 reflesh 방지

    let body = {
      email: Email,
      password: Password,
    };

    //dispatch를 이용해서 loginUser라는 aciton을 취한다.
    dispatch(loginUser(body)).then((response) => {
      console.log("result: ", response.payload.loginSuccess);
      if (response.payload.loginSuccess) props.history.push("/");
      else alert("Error");
    });
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100vh",
      }}
    >
      <form
        style={{ display: "flex", flexDirection: "column" }}
        onSubmit={onSubmitHandler}
      >
        <label>Email</label>
        <input type="email" value={Email} onChange={onEmailHandler} />
        <label>Password</label>
        <input type="password" value={Password} onChange={onPasswordHandler} />
        <br />
        <button>Login</button>
      </form>
    </div>
  );
}

export default LoginPage;
