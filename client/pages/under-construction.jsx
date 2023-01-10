import React from 'react';

export default function UnderConstruction(props) {
  const image = 'https://i.imgur.com/HXEpouw.png';
  return (
    <div className='loading-modal'>
      <div>
        <img src={ image } alt='Under Construction Sign' />
      </div>
      <div>
        <p>This page was lost in a series of tubes</p>
      </div>
    </div>
  );
}
