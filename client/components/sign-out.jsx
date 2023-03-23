import React from 'react';
import Container from './container';
import AppContext from '../lib/app-context';

export default class SignOut extends React.Component {
  render() {
    const { handleSignOut } = this.context;
    return (
      <Container>
        <h3 className="text-align-center">
          Are you sure you would like to sign out?
        </h3>
        <div className="flex f-align-items-center f-justify-content-center">
          <a href="#home">
            No, take me back home!
          </a>
          <button onClick={handleSignOut}>
            Confirm
          </button>
        </div>
      </Container>
    );
  }
}

SignOut.contextType = AppContext;
