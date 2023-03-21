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
    const { action } = this.props;
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
        window.location.hash = '#home';
      });
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
        <div className="auth-buttons">
          <button type="submit" className="placeholder">
            Register
          </button>
        </div>
      </form>
    );
  }
}
