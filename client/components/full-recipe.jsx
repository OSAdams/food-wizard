import React from 'react';
import ListGenerator from './list-generator';
import Accordion from './accordion';

export default function FullRecipe(props) {
  const { recipe } = props;
  const basicContent = [
    { number: '001', name: 'Time', value: recipe.readyInMinutes },
    { number: '002', name: 'Servings', value: recipe.servings },
    { number: '003', name: 'Calories', value: 300 },
    { number: '004', name: 'Place', value: 'holder' }
  ];
  const recipeContent = [
    { number: '010', name: 'Ingredients', value: recipe.extendedIngredients },
    { number: '020', name: 'Instructions', value: recipe.analyzedInstructions[0].steps }
  ];
  return (
    <div className="fr-header">
      <h2> { recipe.title } </h2>
      <div className="fr-basic">
        <ul className="li-style-none">
          <ListGenerator content={basicContent} />
        </ul>
      </div>
      <div className="fr-ingredients">
        <Accordion data={ recipeContent } />
      </div>
    </div>
  );
}
