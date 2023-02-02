import React from 'react';
import UnderConstruction from '../pages/under-construction';

export default class AuthForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: ''
    };
  }

  render() {
    return (
      <UnderConstruction />
    );
  }
}
