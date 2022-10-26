import React from 'react';

export default function recipeCard(props) {
  const { title } = props;
  let updatedTitle = '';
  if (title.length > 40) {
    updatedTitle += title.slice(0, 50) + '...';
  } else {
    updatedTitle = title;
  }
  return (
    <div className="recipe-card">
      <div className="rc-text">
        <div>
          <h3>{updatedTitle}</h3>
        </div>
        <div>
          <ul className="li-style-none">
            <li><p className="font-dark-2">time: { props.time }</p></li>
            <li><p className="font-dark-2">servings: { props.servings }</p></li>
            <li><p className="font-dark-2">diet: { props.diet }</p></li>
          </ul>
        </div>
      </div>
      <div className="rc-image" style={{
        backgroundImage: `url(${props.image})`
      }}>
        <div className="rc-likes font-light-1 txt-shadow">
          <h1>{props.likes} <i className="fa-solid fa-thumbs-up" /></h1>
        </div>
      </div>
    </div>
  );
}
