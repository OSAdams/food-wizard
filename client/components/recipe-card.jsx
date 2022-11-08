import React from 'react';
import { arrayToString } from '../lib';

export default function recipeCard(props) {
  const { title, time, servings, diet, image, likes } = props;
  const updatedDiet = arrayToString(diet);
  return (
    <div className="recipe-card">
      <div className="rc-text">
        <div>
          <h3 className="rc-title">{title}</h3>
        </div>
        <div>
          <ul className="li-style-none">
            <li><p>time: { time } minutes</p></li>
            <li><p>servings: { servings }</p></li>
            <li><p>{ updatedDiet }</p></li>
          </ul>
        </div>
      </div>
      <div className="rc-image" style={{
        backgroundImage: `url(${image})`
      }}>
        <div className="rc-shade" />
        <div className="rc-likes font-light-1 txt-shadow">
          <h2>{ likes } <i className="fa-solid fa-thumbs-up" /></h2>
        </div>
      </div>
    </div>
  );
}
