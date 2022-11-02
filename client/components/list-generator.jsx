import React from 'react';

export default function ListGenerator(props) {
  const liData = props.content.map(index => {
    if (!index.value) {
      return (
        <li key={index.id}>
          <p>{ index.original }</p>
        </li>
      );
    }
    return (
      <li key={index.number}><p>{index.name}: {index.value}</p></li>
    );
  });
  return liData;
}

// if (index.original) {
//   return (
//     <li key={index.id}>
//       <p>{index.original}</p>
//     </li>
//   );
// } else if (typeof value !== 'object') {
//   return (
//     <li key={index.number}>
//       <p>{index.name}: {index.value}</p>
//     </li>
//   );
// } else if (index[0].steps) {
//   return (
//     <li key={index[0].steps.number}>
//       <p>
//         {index[0].steps.step}
//       </p>
//     </li>
//   );
// }
