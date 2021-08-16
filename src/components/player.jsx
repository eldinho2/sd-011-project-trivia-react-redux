import React from 'react';
import Header from '../pages/header';
import GameScreen from './gameScreen';

export default class Player extends React.Component {
  constructor() {
    super();
    this.state = {
      results: [],
    };
  }

  componentDidMount() {
    this.getQuestionsApi();
  }

  async getQuestionsApi() {
    const token = localStorage.getItem('token');
    const url = `https://opentdb.com/api.php?amount=5&token=${token}`;
    const request = await fetch(url);
    const data = await request.json();

    this.setState({
      results: data.results,
    });
  }

  render() {
    const { results } = this.state;
    return (
      <div>
        <Header />
        <GameScreen results={ results } />
      </div>
    );
  }
}
