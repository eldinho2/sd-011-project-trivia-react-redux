import React, { Component } from 'react';
import logo from './trivia.png';
import './App.css';

export default class App extends Component {
  render() {
    return (
      <div className="App">
      <header className="App-header">
        <img src={ logo } className="App-logo" alt="logo" />
        <p>
          teste
        </p>
      </header>
    </div>
    )
  }
}
