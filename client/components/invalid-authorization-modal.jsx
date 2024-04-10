import React from 'react';
import LineBreak from './line-break';

export default function InvalidAuthorization(props) {
  return (
    <div className="no-auth-container">
      <div className="no-auth-modal text-align-center">
        <h3>Are you trying to log in?</h3>
        <p>If you are seeing this, the username or password is incorrect.</p>
        <p>If you forget your login, please register a new account.</p>
        <LineBreak />
        <h3>Are you trying to register?</h3>
        <p>If you&apos;re seeing this message, the username is already in use.</p>
      </div>
    </div>
  );
}
