import React from 'react';
import AppContext from '../lib/app-context';

export default class SignOut extends React.Component {
  render() {
    const { handleSignOut } = this.context;
    return (
      <div>
        <h3 className="text-align-center">
          Are you sure you<br /> would like to sign out?
        </h3>
        <div className="flex f-justify-content-center f-align-items-center auth-sign-out">
          <a href="#home">
            No, take me back home!
          </a>
          <button onClick={handleSignOut}>
            Confirm
          </button>
        </div>
      </div>
    );
  }
}

SignOut.contextType = AppContext;
