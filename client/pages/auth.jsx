import React from 'react';
import AuthForm from '../components/auth-form';
import AppContext from '../lib/app-context';
import Redirect from '../components/redirect';
import Container from '../components/container';

export default class Auth extends React.Component {
  render() {
    const { user, route, handleSignIn } = this.context;
    if (user) return <Redirect to="" />;
    const welcomeMessage = route.path === 'sign-in'
      ? 'Please sign in to continue'
      : 'Create an account to get started';
    return (
      <>
        <Container>
          <h3 className="text-align-center">Food Wizard</h3>
          <p className="text-align-center">{ welcomeMessage }</p>
        </Container>
        <Container>
          <AuthForm
          key={route.path}
          action={route.path}
          onSignIn={handleSignIn} />
        </Container>
      </>
    );
  }
}

Auth.contextType = AppContext;
