import React from 'react';
import InvalidAuthorization from './invalid-authorization-modal';

export default class AuthForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      isValid: null
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  handleSubmit(e) {
    e.preventDefault();
    const { props: { action, onSignIn }, state } = this;
    const req = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(state)
    };
    fetch(`/api/auth/${action}`, req)
      .then(res => {
        if (!res.ok) this.setState({ isValid: false });
        return res.json();
      })
      .then(result => {
        if (action === 'sign-up') {
          this.setState({ isValid: null });
          window.location.hash = 'sign-in';
        } else if (result.user && result.token) {
          onSignIn(result);
        }
      })
      .catch(err => console.error({ error: err }));
  }

  render() {
    const { props: { action }, handleChange, handleSubmit, state: { isValid } } = this;
    const alternateActionHref = action === 'sign-up'
      ? '#sign-in'
      : '#sign-up';
    const alternateActionText = action === 'sign-up'
      ? 'Sign in instead'
      : 'Register now';
    const submitButtonText = action === 'sign-up'
      ? 'Register'
      : 'Log In';
    return (
      <form className="auth-form flex f-dir-col f-align-items-center f-justify-content-center" onSubmit={ handleSubmit }>
        <div className="auth-username">
          <label htmlFor="username">
            Username:
          </label>
          <input
            required
            autoFocus
            id="username"
            type="text"
            name="username"
            onChange={ handleChange } />
        </div>
        <div className="auth-password">
          <label htmlFor="password">
            Password:
          </label>
          <input
            required
            id="password"
            type="password"
            name="password"
            onChange={ handleChange } />
        </div>
        <div className="auth-buttons">
          <a href={alternateActionHref}>
            { alternateActionText }
          </a>
          <button type="submit" className="auth-loggin">
            { submitButtonText }
          </button>
        </div>
        {isValid === false && <InvalidAuthorization /> }
      </form>
    );
  }
}
