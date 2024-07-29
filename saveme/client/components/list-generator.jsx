import React from 'react';

export default function ListGenerator(props) {
  const { content, helperMethod } = props;
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
    if (helperMethod) {
      return (
        <li onClick={ helperMethod } key={index.number} className={index.className}>
          <div>
            {
              !index.name
                ? <p>{index.value}</p>
                : <p>{index.name}: {index.value}</p>
            }
          </div>
        </li>
      );
    }
    return (
      <li key={ index.number } >
        {
          !index.name
            ? <p>{index.value}</p>
            : <p>{index.name}: {index.value}</p>
        }
      </li>
    );
  });
  return liData;
}
