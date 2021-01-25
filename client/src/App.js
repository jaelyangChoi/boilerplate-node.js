import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import LandingPage from "./components/views/LandingPage/LandingPage";
import LoginPage from "./components/views/LoginPage/LoginPage";
import RegisterPage from "./components/views/RegisterPage/RegisterPage";
import auth from "./hoc/auth";

function App() {
  return (
    <Router>
      <div>
        {/*
          A <Switch> looks through all its children <Route>
          elements and renders the first one whose path
          matches the current URL. Use a <Switch> any time
          you have multiple routes, but you want only one
          of them to render at a time
        */}
        <Switch>
          {/* <Route exact path="/" component={LandingPage} /> 인증 처리 전*/}
          <Route exact path="/" component={auth(LandingPage, null)} />
          <Route exact path="/login" component={auth(LoginPage, false)} />
          <Route exact path="/register" component={auth(RegisterPage, false)} />
        </Switch>
      </div>
    </Router>
  );
}
// You can think of these components as "pages"
export default App;
