import React from 'react';
import { Switch, Route } from 'react-router';
import Login from './pages/login';
import Header from './pages/header';
import Player from './components/player';
import Configuration from './pages/configuration';
import feedback from './pages/feedback';
import Ranking from './components/Ranking';

export default function App() {
  return (
    <Switch>
      <Route path="/configuration" component={ Configuration } />
      <Route path="/player" component={ Player } />
      <Route exact path="/" component={ Login } />
      <Route exact path="/header" component={ Header } />
      <Route exact path="/feedback" component={ feedback } />
      <Route exact path="/ranking" component={ Ranking } />
    </Switch>
  );
}
