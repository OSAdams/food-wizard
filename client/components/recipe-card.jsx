import React from 'react';

export default function RecipeCard(props) {
  return (
    <div className="rc">
      <div className="t-ct">
        <h3>{ props.title }</h3>
        <ul>
          <li><p>calories: { props.calories }</p></li>
          <li><p>time: { props.time } minutes</p></li>
          <li><p>cuisine: { props.cuisine }</p></li>
        </ul>
      </div>
      <div className="img-ct">
        <div className="rt"><p>rating: { props.rating }</p></div>
      </div>
    </div>
  );
}
