import React from 'react';

export default function recipeCard(props) {
  const { title } = props;
  const updatedTitle = title.length > 40
    ? title.slice(0, 50) + '...'
    : title;
  return (
    <div className="recipe-card">
      <div className="rc-text">
        <div>
          <h3 className="rc-title">{updatedTitle}</h3>
        </div>
        <div>
          <ul className="li-style-none">
            <li><p>time: { props.time }</p></li>
            <li><p>servings: { props.servings }</p></li>
            <li><p>{
              !props.diet
                ? 'no diet information found'
                : `diet: ${props.diet}`
            }</p></li>
          </ul>
        </div>
      </div>
      <div className="rc-image" style={{
        backgroundImage: `url(${props.image})`
      }}>
        <div className="rc-shade" />
        <div className="rc-likes font-light-1 txt-shadow">
          <h2>{props.likes} <i className="fa-solid fa-thumbs-up" /></h2>
        </div>
      </div>
    </div>
  );
}
