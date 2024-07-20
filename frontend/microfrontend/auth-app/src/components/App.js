import React, { useContext } from "react";
import * as auth from "../utils/auth";
import Register from "./Register";
import Login from "./Login";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { CurrentUserContext } from "../../../../shared-library/src/Components/CurrentUserContext"
import history from "../../../../shared-library/src/utils/history"

function App() {
  const context = useContext(CurrentUserContext);
  const {setIsLoggedIn, setEmail, setTooltipStatus, setIsInfoToolTipOpen} = context
  // при монтировании App описан эффект, проверяющий наличие токена и его валидности
  React.useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (token) {
      auth
        .checkToken(token)
        .then((res) => {
          setEmail(res.data.email);
          setIsLoggedIn(true);
          history.push("/");
        })
        .catch((err) => {
          localStorage.removeItem("jwt");
          console.log(err);
        });
    }
  }, [history]);

  function onRegister({email, password}) {
    auth
      .register(email, password)
      .then((res) => {
        setTooltipStatus("success");
        setIsInfoToolTipOpen(true);
        history.push("/signin");
      })
      .catch((err) => {
        setTooltipStatus("fail");
        setIsInfoToolTipOpen(true);
      });
  }

  function onLogin({email, password}) {
    auth
      .login(email, password)
      .then((res) => {
        setIsLoggedIn(true);
        setEmail(email);
        history.push("/");
      })
      .catch((err) => {
        setTooltipStatus("fail");
        setIsInfoToolTipOpen(true);
      });
  }


  return (
    <BrowserRouter>
      <Switch>
        {/*Роут /signup и /signin не является защищёнными, т.е оборачивать их в HOC ProtectedRoute не нужно.*/}
        <Route path="/signup">
          <Register onRegister={onRegister}/>
        </Route>
        <Route path="/signin">
          <Login onLogin={onLogin}/>
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
