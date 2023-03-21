import React from 'react';
import { arrayToString } from '../lib';

export default function recipeCard(props) {
  const { title, time, servings, diet, image, likes, id, methods } = props;
  const updatedDiet = arrayToString(diet);
  return (
    <div
      onClick={ methods ? methods[0] : null }
      className="recipe-card flex f-dir-col">
      <div className="rc-text">
        <div>
          <h3 className="rc-title" id={id}>{title}</h3>
        </div>
        <div>
          <ul className="li-style-none">
            <li><p>time: { time } minutes</p></li>
            <li><p>servings: { servings }</p></li>
            <li><p>{ updatedDiet }</p></li>
          </ul>
        </div>
      </div>
      <div className="rc-image flex f-align-items-f-end f-justify-content-center" style={{
        backgroundImage: `url(${image})`
      }}>
        <div className="rc-likes font-light-1 txt-shadow">
          <h2>{ likes } <i className="fa-solid fa-thumbs-up" /></h2>
        </div>
      </div>
    </div>
  );
}
