import React from 'react';
import { arrayToString } from '../lib';
import LineBreak from './line-break';

export default function recipeCard(props) {
  const { title, time, servings, diet, image, likes, id, methods } = props;
  const updatedDiet = arrayToString(diet);
  return (
    <div
      className="recipe-card flex f-dir-col marg-bot-2rem">
      <div className="rc-text">
        <div className="rc-title">
          <h2 className="rc-title-text" onClick={methods ? methods[0] : null} id={id}>{title}</h2>
          <p className="help-text">Click the title to view the recipe!</p>
        </div>
        <div className="rc-diet-information">
          <ul className="list-style-none">
            <li>
              <div>
                <p>
                  <span className="rc-descriptions">Time Investment:</span><br/>
                  <span className="rc-information">Roughly {time} minutes</span>
                </p>
              </div>
            </li>
            <li>
              <div>
                <p>
                  <span className="rc-descriptions">Servings:</span><br/>
                  <span className="rc-information">Feeds up to {servings}!</span>
                </p>
              </div>
            </li>
            <li>
              <div>
                <p>
                  <span className="rc-descriptions">Diet Restrictions:</span><br/>
                  <span className="rc-information">{updatedDiet}</span>
                </p>
              </div>
            </li>
          </ul>
        </div>
        <LineBreak />
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
