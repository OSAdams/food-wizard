import React from 'react';

export default class AuthForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: ''
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
    let action = '';
    if (this.state.username.length < 1 || this.state.password.length < 1) {
      alert('Username and Password are required fields');
      return;
    }
    if (e.target.className === 'auth-register') {
      action = 'sign-up';
    } else {
      action = 'sign-in';
    }
    const req = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(this.state)
    };
    fetch(`/api/auth/${action}`, req)
      .then(res => res.json())
      .then(result => {
        console.log(result); // eslint-disable-line
      })
      .catch(err => console.error({ error: err }));
  }

  render() {
    const { handleChange, handleSubmit } = this;
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
        <div className="auth-buttons" onClick={ handleSubmit }>
          <button type="submit" className="auth-register">
            Register
          </button>
          <button type="submit" className="auth-loggin">
            Log In
          </button>
        </div>
      </form>
    );
  }
}
