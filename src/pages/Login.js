import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import tokenApi from '../services/tokenApi';
import logo from '../trivia.png';
import { setPlayer } from '../actions/playerActions';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      name: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.validateLogin = this.validateLogin.bind(this);
    this.startGame = this.startGame.bind(this);
  }

  handleChange({ target: { name, value } }) {
    this.setState({ [name]: value });
  }

  validateLogin() {
    const { email, name } = this.state;
    if (email.length > 0 && name.length > 0) {
      return false;
    }
    return true;
  }

  async startGame() {
    const { token } = await tokenApi();
    const { email, name } = this.state;
    const { setPlayerAction } = this.props;
    const player = {
      name,
      assertions: 0,
      score: 0,
      gravatarEmail: email,
    };
    localStorage.setItem('token', token);
    localStorage.setItem('state', JSON.stringify(player));
    setPlayerAction(player);
  }

  createTextInput(testId, value, label, name) {
    return (
      <label htmlFor={ testId }>
        { label }
        <input
          data-testid={ testId }
          id={ testId }
          type="text"
          name={ name }
          value={ value }
          onChange={ this.handleChange }
        />
      </label>
    );
  }

  render() {
    const { email, name } = this.state;
    const { history } = this.props;
    return (
      <div>
        <header className="App-header">
          <img src={ logo } className="App-logo" alt="logo" />
          <p>SUA VEZ</p>
        </header>
        <form>
          { this.createTextInput('input-player-name', name, 'Nome:', 'name')}
          { this.createTextInput('input-gravatar-email', email, 'E-mail:', 'email')}
          <button
            data-testid="btn-play"
            type="button"
            disabled={ this.validateLogin() }
            onClick={ () => { this.startGame(); history.push('/jogo'); } }
          >
            Jogar
          </button>
          <button
            data-testid="btn-settings"
            type="button"
            onClick={ () => history.push('/configuracao') }
          >
            Configurações
          </button>
        </form>

      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  setPlayerAction: (player) => dispatch(setPlayer(player)),
});

Login.propTypes = ({
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
}).isRequired;

export default connect(null, mapDispatchToProps)(Login);