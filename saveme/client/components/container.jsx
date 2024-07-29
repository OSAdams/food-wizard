import React from 'react';

export default function Container(props, { children }) {
  return (
    <div className={ props.newClassName }>
      { children }
    </div>
  );
}
