import React from 'react';

export default function ListGenerator(props) {
  const liData = props.content.map(index => <li key={index.number}><p>{index.name}: {index.value}</p></li>);
  return (
    <ul className="li-style-none">
      { liData }
    </ul>
  );
}
