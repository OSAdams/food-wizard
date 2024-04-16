import React from 'react';
import AuthForm from '../components/auth-form';
import AppContext from '../lib/app-context';
import Redirect from '../components/redirect';

export default class Auth extends React.Component {
  render() {
    const { context: { user, route, handleSignIn } } = this;
    if (user) return <Redirect to="" />;
    const welcomeMessage = route.path === 'sign-in'
      ? 'Please sign in to continue'
      : 'Create an account to get started';
    return (
      <>
        <div>
          <h1 className="text-align-center">Sign In or Register</h1>
          <p className="text-align-center">{ welcomeMessage }</p>
        </div>
        <div>
          <AuthForm
          key={route.path}
          action={route.path}
          onSignIn={handleSignIn} />
        </div>
      </>
    );
  }
}

Auth.contextType = AppContext;
