import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { playerScore } from '../actions';
import Timer from './Timer';

class gameScreen extends Component {
  constructor() {
    super();
    const { player } = JSON.parse(localStorage.getItem('state'));
    this.state = {
      question: 0,
      answered: false,
      player,
      feedback: false,
    };

    this.colorSelectCorrect = this.colorSelectCorrect.bind(this);
    this.nextQuestion = this.nextQuestion.bind(this);
    this.correctAnswer = this.correctAnswer.bind(this);
    this.onClickHandler = this.onClickHandler.bind(this);
  }

  onClickHandler() {
    this.colorSelectCorrect();
    this.correctAnswer();
  }

  correctAnswer() {
    const fixedPoints = 10;
    const { question, player } = this.state;
    const { results, dispatchUserScore } = this.props;
    let difValue = 0;
    const hard = 3;
    const cronoValue = document
      .querySelector('.cronometer')
      .innerHTML.split(':')[1];
    if (results[question].difficulty === 'hard') {
      difValue = hard;
    }
    if (results[question].difficulty === 'medium') {
      difValue = 2;
    }
    if (results[question].difficulty === 'easy') {
      difValue = 1;
    }
    localStorage.setItem(
      'state',
      JSON.stringify({
        player: {
          name: player.name,
          assertions: player.assertions + 1,
          score: player.score + (fixedPoints + cronoValue * difValue),
          gravatarEmail: player.email,
        },
      }),
    );
    this.setState({ player: {
      name: player.name,
      assertions: player.assertions + 1,
      score: player.score + (fixedPoints + cronoValue * difValue),
      gravatarEmail: player.email,
    } });
    dispatchUserScore(
      JSON.parse(localStorage.getItem('state')).player.score,
      JSON.parse(localStorage.getItem('state')).player.assertions,
    );
  }

  colorSelectCorrect() {
    const btns = document.querySelectorAll('button');
    btns.forEach((element) => {
      element.classList.add('revel-color');
    });
    this.setState({
      answered: true,
    });
  }

  nextQuestion() {
    const { results } = this.props;
    const { question } = this.state;
    if (question < results.length - 1) {
      this.setState({
        question: question + 1,
        answered: false,
      });
    }
    const btns = document.querySelectorAll('button');
    btns.forEach((element) => {
      element.classList.remove('revel-color');
    });
    this.setState({
      answered: true,
    });
    const maxquestions = 4;
    if (question === maxquestions) {
      this.setState({ feedback: true });
    }
  }

  render() {
    const { results } = this.props;
    const { question, answered, feedback } = this.state;
    if (feedback) {
      return (
        <Redirect to="/feedback" />
      );
    }
    return (
      <div>
        <Timer />
        {results.length > 0 ? (
          <div>
            <p data-testid="question-category">{results[question].category}</p>
            <p data-testid="question-text">{results[question].question}</p>
            <button
              type="button"
              data-testid="correct-answer"
              className="green-border"
              onClick={ () => this.onClickHandler() }
            >
              {results[question].correct_answer}
            </button>
            {results[0].incorrect_answers.map((answer, index) => (
              <button
                key={ index }
                type="button"
                data-testid={ `wrong-answer-${index}` }
                className="red-border"
                onClick={ () => this.colorSelectCorrect() }
              >
                {answer}
              </button>
            ))}
          </div>
        ) : (
          <p>Baixando Questões</p>)}
        {answered ? (
          <button
            type="button"
            onClick={ this.nextQuestion }
            data-testid="btn-next"
          >
            Próxima questão
          </button>
        ) : null}
      </div>
    );
  }
}

gameScreen.propTypes = {
  results: PropTypes.arrayOf(PropTypes.any).isRequired,
  dispatchUserScore: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  dispatchUserScore: (score, assertions) => dispatch(playerScore(score, assertions)),
});

export default connect(null, mapDispatchToProps)(gameScreen);
