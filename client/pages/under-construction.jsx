import React from 'react';

export default function UnderConstruction(props) {
  const image = 'https://i.imgur.com/HXEpouw.png';
  return (
    <div className='loading-modal'>
      <h1>Page Under Construction</h1>
      <div>
        <img src={ image } alt='Under Construction Sign' />
      </div>
      <div className='text-align-center'>
        <h2>Welcome!</h2>
        <p>This page is not yet completed!</p>
        <p>You are currently on <a href="https://food-wizard.osastack.dev" target="__blank">Food Wizard!</a></p>
        <p>View the GitHub Repository <a href="https://github.com/OSAdams/final-project" target="__blank">here</a>!</p>
      </div>
    </div>
  );
}
