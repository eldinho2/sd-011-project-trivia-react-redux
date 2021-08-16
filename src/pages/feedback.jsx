import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from './header';

class Feedback extends Component {
  render() {
    const { assertions, score } = this.props;
    const rightAnswers = 3;
    return (
      <div>
        <h1>Feedback</h1>
        <Header />
        <p data-testid="feedback-text">
          {assertions < rightAnswers ? (
            <span>Podia ser melhor...</span>
          ) : (
            <span>Mandou bem!</span>
          )}
        </p>
        <h2
          data-testid="feedback-total-score"
        >
          { score }
        </h2>
        <h2
          data-testid="feedback-total-question"
        >
          { assertions }
        </h2>
        <Link to="/">
          <button type="button" data-testid="btn-play-again"> Jogar Novamente </button>
        </Link>
        <Link to="/ranking">
          <button type="button" data-testid="btn-ranking">Ver Ranking</button>
        </Link>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  assertions: state.playerReducer.assertions,
  score: state.playerReducer.score,
});

Feedback.propTypes = {
  assertions: PropTypes.number.isRequired,
  score: PropTypes.number.isRequired,
};

export default connect(mapStateToProps, null)(Feedback);
