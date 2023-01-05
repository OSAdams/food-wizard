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
    /*
    ###################
    This is ugly
    ###################
    */
    if (index.className) {
      return (
        <li key={index.number} className={index.className}>
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
    /*
    #####################
    Look into refactor
    #####################
    */
    return (
      <li key={ index.number } >
        { !index.name
          ? <p>{index.value}</p>
          : <p>{index.name}: {index.value}</p>
        }
      </li>
    );
  });
  return liData;
}
