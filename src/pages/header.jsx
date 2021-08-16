import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import md5 from 'crypto-js/md5';

class Header extends React.Component {
  render() {
    const { name, score, email } = this.props;
    const hash = md5(email);
    return (
      <header>
        <img
          data-testid="header-profile-picture"
          alt="gravatar"
          src={ `https://www.gravatar.com/avatar/${hash}` }
        />
        <p>
          Jogador:
          <span data-testid="header-player-name">{ name }</span>
          <br />
          Placar:
          <span data-testid="header-score">{ score }</span>
        </p>
      </header>
    );
  }
}

Header.propTypes = {
  name: PropTypes.string,
  score: PropTypes.number,
  email: PropTypes.string,
}.isRequired;

const mapStateToProps = (state) => ({
  name: state.playerReducer.name,
  score: state.playerReducer.score,
  email: state.playerReducer.email,
});

export default connect(mapStateToProps, null)(Header);
