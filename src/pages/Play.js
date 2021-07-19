import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchQuestions, addPoint } from '../actions';
import './Play.css';

const timerStart = 30;

class Play extends Component {
  constructor() {
    super();

    this.state = {
      count: timerStart,
      qIndex: 0,
      assertions: 0,
      answered: false,
    };

    this.initialFetch = this.initialFetch.bind(this);
    this.renderQuestion = this.renderQuestion.bind(this);
    this.handleCorrect = this.handleCorrect.bind(this);
    this.nextQuestion = this.nextQuestion.bind(this);
    this.renderNxtBtn = this.renderNxtBtn.bind(this);
    this.setLocal = this.setLocal.bind(this);
  }

  componentDidMount() {
    this.initialFetch();
    const oneSecond = 1000;
    this.myInterval = setInterval(() => {
      const { count, answered } = this.state;
      if (count > 0 && !answered) {
        this.setState((state) => ({
          ...state,
          count: count - 1,
        }));
      } else if (!answered) {
        console.log('click');

        const wrongBtn = document.querySelector('.wrong');
        wrongBtn.click();
      }
    }, oneSecond);
  }

  componentWillUnmount() {
    clearInterval(this.myInterval);
  }

  async initialFetch() {
    const { getQuestions, token } = this.props;
    await getQuestions(token);
  }

  setLocal() {
    const { name, email, score } = this.props;
    const { assertions } = this.state;
    const player = {
      name,
      assertions,
      score,
      gravatarEmail: email,
    };
    localStorage.setItem('state', JSON.stringify({ player }));
  }

  async handleCorrect(event) {
    event.preventDefault();
    const { addScore, questions } = this.props;
    const { qIndex, count } = this.state;
    const currQuestion = questions[qIndex];
    const { className } = event.target;
    const btns = document.querySelectorAll('button.correct, button.wrong');
    btns.forEach((btn) => {
      btn.classList.add('revealed');
    });
    const difficulty = () => {
      switch (currQuestion.difficulty) {
      case 'easy':
        return 1;
      case 'medium':
        return 2;
      case 'hard':
        return 3;
      default:
        return 0;
      }
    };
    if (className === 'correct') {
      const points = 10 + (count * difficulty());
      await addScore(points);
      this.setState((state) => ({
        assertions: state.assertions + 1,
      }))
    }
    this.setState(() => ({
      answered: true,
    }));
    this.setLocal();
  }

  nextQuestion() {
    const { questions, history } = this.props;
    const { qIndex } = this.state;
    if (qIndex < questions.length - 1) {
      this.setState((state) => ({
        count: timerStart,
        qIndex: state.qIndex + 1,
        answered: false,
      }));
    } else {
      history.push('/Feedback');
    }
  }

  renderNxtBtn() {
    return (
      <button
        type="submit"
        onClick={ this.nextQuestion }
        data-testid="btn-next"
        className="my-next-btn"
      >
        Next
      </button>
    );
  }

  renderQuestion() {
    const { questions } = this.props;
    const { qIndex, answered } = this.state;
    const currQuestion = questions[qIndex];
    const correctA = currQuestion.correct_answer;
    const posAnswers = [correctA, ...currQuestion.incorrect_answers];
    const initialIndex = -1;
    let index = initialIndex;
    const ran = 0.5;
    posAnswers.sort(() => Math.random() - ran);
    return (
      <div>
        <span data-testid="question-category">{ currQuestion.category }</span>
        <p data-testid="question-text">{ currQuestion.question }</p>
        {posAnswers.map((answer) => {
          if (answer === correctA) {
            return (
              <button
                key={ answer }
                type="submit"
                data-testid="correct-answer"
                className="correct"
                disabled={ answered }
                onClick={ this.handleCorrect }
              >
                { answer }
              </button>
            );
          }
          index += 1;
          return (
            <button
              key={ answer }
              type="submit"
              data-testid={ `wrong-answer-${index}` }
              className="wrong"
              disabled={ answered }
              onClick={ this.handleCorrect }
            >
              { answer }
            </button>
          );
        })}
      </div>
    );
  }

  render() {
    const { questions, score, name } = this.props;
    const { answered, count } = this.state;
    const carr = <span>Carregando</span>;
    return (
      <div>
        <header>
          <img data-testid="header-profile-picture" alt="profile-pic" />
          <span data-testid="header-player-name">{ name }</span>
          <span data-testid="header-score">{ score }</span>
        </header>
        <div>{count}</div>
        { questions.length ? this.renderQuestion() : carr }
        { (answered) ? this.renderNxtBtn() : '' }
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  token: state.questions.token,
  questions: state.questions.questions,
  score: state.questions.score,
  name: state.userReducer.name,
  email: state.userReducer.email,
});

const mapDispatchToProps = (dispatch) => ({
  getQuestions: (state) => dispatch(fetchQuestions(state)),
  addScore: (state) => dispatch(addPoint(state)) });

Play.propTypes = {
  getQuestions: PropTypes.func.isRequired,
  addScore: PropTypes.func.isRequired,
  token: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
  questions: PropTypes.arrayOf(PropTypes.object).isRequired,
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Play);