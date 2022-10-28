import React from 'react';

export default function IconGenerator(props) {
  if (!props.className) {
    return { error: 'class property required' };
  }
  return <i className={ props.className } id={ props.id } />;
}
