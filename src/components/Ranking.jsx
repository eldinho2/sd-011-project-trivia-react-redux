import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';

class Ranking extends Component {
  constructor() {
    super();
    this.handleClickPlayAgain = this.handleClickPlayAgain.bind(this);
  }

  handleClickPlayAgain() {
    const { history } = this.props;
    history.push('/');
  }

  render() {
    const state = JSON.parse(localStorage.getItem('state'));
    const { name, score, email } = this.props;
    const hash = md5(email).toString();
    const ranking = { ranking: { name, score, picture: `https://www.gravatar.com/avatar/${hash}` } };
    localStorage.setItem('state', JSON.stringify(ranking));
    return (
      <div>
        <h2 data-testid="ranking-title">Ranking</h2>
        <img
          data-testid="header-profile-picture"
          alt="gravatar"
          src={ `https://www.gravatar.com/avatar/${hash}` }
        />
        <p>{name}</p>
        <p>
          {score}
          {' '}
          pontos
        </p>
        <p>
          {state.player.assertions}
          {' '}
          acertos
        </p>
        <button
          data-testid="btn-play-again"
          type="button"
          onClick={ this.handleClickPlayAgain }
        >
          Jogar novamente
        </button>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  name: state.playerReducer.name,
  score: state.playerReducer.score,
  email: state.playerReducer.email,
});

export default connect(mapStateToProps)(Ranking);

Ranking.propTypes = {
  history: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
  email: PropTypes.string.isRequired,
};
