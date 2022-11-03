import React from 'react';

export default function ListGenerator(props) {
  const { content } = props;
  const liData = content.map(index => {
    if (!index.original && !index.value) {
      return (
        <li key={ index.number }>
          <p>{ index.step }</p>
        </li>
      );
    }
    if (index.original) {
      return (
        <li key={ index.id }>
          <p>{ index.original }</p>
        </li>
      );
    }
    return (
      <li key={ index.number } >
        <p>{ index.name }: { index.value }</p>
      </li>
    );
  });
  return liData;
}
