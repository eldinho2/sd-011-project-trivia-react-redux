import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { timerButton, nextQuestionCount } from '../actions';

class TimerComponent extends Component {
  constructor() {
    super();
    this.state = {
      seconds: 30,
      count: 0,
    };
    this.timer = this.timer.bind(this);
    this.updateLocalStorage = this.updateLocalStorage.bind(this);
    this.buttonNextQuestion = this.buttonNextQuestion.bind(this);
    this.newQuestion = this.newQuestion.bind(this);
  }

  componentDidMount() {
    const second = 1000;
    this.interval = setInterval(() => this.timer(), second);
  }

  componentDidUpdate() {
    const { buttonClick, rightBtnClicked } = this.props;
    const { count } = this.state;
    localStorage.setItem('numberQuestion', JSON.stringify(count));
    if (buttonClick) {
      clearInterval(this.interval);
      const stopTime = document.querySelector('.timer');
      const question = document.querySelector('#question');
      const difficulty = question.getAttribute('difficulty');
      const score = rightBtnClicked
        ? this.setScore(stopTime.innerHTML, difficulty)
        : 0;
      this.updateLocalStorage(score);
    }
  }

  setScore(timer, difficulty) {
    const ten = 10;
    const questionLevel = (dif) => {
      const one = 1;
      const two = 2;
      const three = 3;
      switch (dif) {
      case 'easy':
        return one;
      case 'medium':
        return two;
      case 'hard':
        return three;
      default:
        break;
      }
    };
    // const score = 10 + (timer * questionLevel(obj1));
    return ten + (timer * questionLevel(difficulty));
  }

  updateLocalStorage(score) {
    const player = JSON.parse(localStorage.getItem('state'));
    player.player.score = score;
    localStorage.setItem('state', JSON.stringify(player));
  }

  timer() {
    const { seconds } = this.state;
    if (seconds !== 0) {
      this.setState((prevState) => ({
        seconds: prevState.seconds - 1,
      }
      ));
    }
    if (seconds === 0) {
      const { updateButton } = this.props;
      updateButton();
    }
  }

  newQuestion() {
    const { nextQuestion } = this.props;
    const { count } = this.state;
    nextQuestion(count);
  }

  buttonNextQuestion() {
    const maxQuestions = 4;
    const { count } = this.state;
    const { finishQuestions } = this.props;
    if (count < maxQuestions) {
      this.setState((prevState) => ({
        count: prevState.count + 1,
      }));
    } else {
      finishQuestions();
    }
    // Falta redirecionar a pagina apos 5 perguntas
  }

  render() {
    const { seconds } = this.state;
    const { buttonClick } = this.props;
    this.newQuestion();
    return (
      <div>
        <div>
          <p className="timer">{ seconds }</p>
        </div>
        <div>
          { buttonClick
            && (
              <button
                type="button"
                data-testid="btn-next"
                onClick={ this.buttonNextQuestion }
              >
                Próxima
              </button>)}
        </div>
      </div>
    );
  }
}

TimerComponent.propTypes = {
  updateButton: PropTypes.func.isRequired,
  buttonClick: PropTypes.bool.isRequired,
  rightBtnClicked: PropTypes.bool.isRequired,
  nextQuestion: PropTypes.func.isRequired,
  finishQuestions: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  buttonClick: state.triviaReducer.buttonClick,
  rightBtnClicked: state.triviaReducer.rightBtnClicked,
});

const mapDispatchToProps = (dispatch) => ({
  updateButton: (state) => dispatch(timerButton(state)),
  nextQuestion: (state) => dispatch(nextQuestionCount(state)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TimerComponent);