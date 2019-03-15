import React from "react";
import ReactDOM from "react-dom";
//import { createBrowserHistory } from "history";
import { Provider } from "react-redux";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.css";
import "assets/scss/now-ui-dashboard.css?v=1.2.0";
import "assets/css/demo.css";
import App from "App.jsx";
//import indexRoutes from "routes/index.jsx";
import { store } from "./helpers/store";
import Login from "./views/Forms/Login.jsx";
import RegisterPage from "./views/Pages/RegisterPage.jsx";
import RememberPage from "./views/Pages/RememberPage.jsx";
import DashBoard from "./views/Dashboard/Dashboard.jsx";

//const hist = createBrowserHistory();

//07290984

import { configureFakeBackend } from "./helpers";
configureFakeBackend();

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/register" component={RegisterPage} />
        <Route path="/remember" component={RememberPage} />
        <Route path="/dashboard" component={DashBoard} />
        <Route path="/" component={App} />
      </Switch>
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);
