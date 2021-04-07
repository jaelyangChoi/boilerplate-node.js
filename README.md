# Boilerplate - Node.js
Node.js 기반 웹 개발을 위한 boilerplate code   
개인 프로젝트, 2021.02~2021.02

</br>



## 목적
1. **Frontend와 Backend가 각각 어떤 역할을 하고, 어떻게 연결되는지 그 흐름을 이해**하기    
    → FE, BE 개발 모두 할 수 있는 JS 선택   
    → FE, BE의 기본 틀에 해당하는 Boilerplate를 주제로 선정

2. Node.js 사용해보기

### Boilerplate란?
최소한의 변경으로 여러 곳에서 재사용되며, 반복적으로 비슷한 형태를 띄는 코드.   
앞으로 node.js 기반 웹 프로그램을 만들때 공통적으로 사용할 **기본 틀과 주요 기능을 미리 만들어두고 빠르게 재사용**하기 위함이다.

</br>

## 주요 기능 및 원리
- start: 프로트, 백 서버를 각각 켜야한다. console에 "npm run dev" 입력 (concurrently 이용)

- 회원가입: 회원 가입할 때 필요한 정보들을 FE에서 받아오고 BE에 전달 → BE에서는 db에 저장
  
- 로그인: 아이디 비밀번호가 일치하면 **쿠키에 token**을 넣어준다 → 이 token을 이용해 사용자 정보를 식별

- 로그아웃: **DB의 token 값 삭제** → 쿠키의 토큰과 일치하지 않아 인증 X → 로그인 풀림

- 인증: **로그인 여부, 접근 권한에 따라 페이지 리다이렉션**
  ```
  *권한 확인 과정*
  app.js에서 routing하기 전, hoc/auth 의 통제를 받음(FE)   
  → user_action(FE)에서 백엔드로 인증 여부 요청 
  → request의 token을 이용해 user 정보를 조회(BE)
  → 조회에 성공하면 프론트에게 response로 user 정보와 isAuth=true를 담아 보냄(BE)
  ```

</br>

## 사용 기술
- front-end : React.js(UI 라이브러리), Redux.js(상태 관리 라이브러리)
- back-end : Express.js, MongoDB(Mongoose)
- 개발 환경: node.js v14.15.4, window 10

</br>


## 구조
*프론트에서 클라이언트의 요청을 처리하고 필요에 따라 백서버로 데이터를 요청한다.*
![img](https://user-images.githubusercontent.com/55947154/106376266-02248b80-63d7-11eb-94b2-3598979477b2.png)

- 프론트에서 백 서버로 Request를 보낼 때 axios 사용   

- CORS(Cross-Origin Resource sharing) 문제를 해결하기 위해 http-proxy-middleware를 사용해 proxy 설정
    ![proxy](https://user-images.githubusercontent.com/55947154/106376305-66dfe600-63d7-11eb-8343-39cde1c05cae.png)
    
    ```
    const { createProxyMiddleware } = require("http-proxy-middleware");

    module.exports = function (app) {
      app.use(
        "/api",
        createProxyMiddleware({
          target: "http://localhost:5000",
          changeOrigin: true,
        })
      );
    };
    ```

> https://look-forest.tistory.com/12 에 개괄적으로 정리해두었다.
</br>

