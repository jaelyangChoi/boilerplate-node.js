import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { registerUser } from "../../../_actions/user_action";
import { withRouter } from "react-router-dom"; //history 쓰기 위해

function RegisterPage(props) {
  const dispatch = useDispatch();

  //state
  const [Email, setEmail] = useState(""); //initioal State
  const [Name, setName] = useState("");
  const [Password, setPassword] = useState("");
  const [ConfirmPassword, setConfirmPassword] = useState("");

  //event 발생하면 state 변경
  const onEmailHandler = (event) => setEmail(event.currentTarget.value);
  const onNameHandler = (event) => setName(event.currentTarget.value);
  const onPasswordHandler = (event) => setPassword(event.currentTarget.value);
  const onConfirmPasswordHandler = (event) =>
    setConfirmPassword(event.currentTarget.value);

  const onSubmitHandler = (event) => {
    event.preventDefault(); //페이지 reflesh 방지

    if (Password !== ConfirmPassword)
      return alert("비밀번호와 비밀번호 확인이 일치해야 합니다!");

    let body = {
      name: Name,
      email: Email,
      password: Password,
    };

    //dispatch를 이용해서 registerUser라는 aciton을 취하고, axios로 server에 요청한다.
    dispatch(registerUser(body)).then((response) => {
      console.log("dispatch-register : response : ", response);
      console.log("dispatch-register : response.payload : ", response.payload); //{success:true, userInfo:{}}
      if (response.payload.success) props.history.push("/login");
      else alert("Failed to sign up");
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
        <label>Name</label>
        <input type="text" value={Name} onChange={onNameHandler} />
        <label>Password (5자리 이상)</label>
        <input type="password" value={Password} onChange={onPasswordHandler} />
        <label>Confirm Password</label>
        <input
          type="password"
          value={ConfirmPassword}
          onChange={onConfirmPasswordHandler}
        />
        <br />
        <button>회원 가입</button>
      </form>
    </div>
  );
}

export default withRouter(RegisterPage);
