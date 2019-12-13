import React from "react";
import { Router, Switch, Route } from "react-router";
import { createBrowserHistory } from "history";
import "./App.css";
import { PokemonListPage } from "../PokemonListPage/PokemonListPage";

export const browserHistory = createBrowserHistory();

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const App = () => (
  <Router history={browserHistory}>
    <Switch>
      <Route path="/" component={PokemonListPage} />
    </Switch>
  </Router>
);
