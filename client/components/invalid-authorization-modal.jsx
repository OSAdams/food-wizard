import React from 'react';

export default function InvalidAuthorization(props) {
  return (
    <div className="placeholder-background">
      <div className="placeholder-modal text-align-center">
        <h3>Invalid Username or Password</h3>
        <p>We do not have a password recovery feature.</p>
        <p>If you forget your login, please register a new account.</p>
      </div>
    </div>
  );
}
