import React from 'react';
import ListGenerator from './list-generator';
import Accordion from './accordion';

export default function FullRecipe(props) {
  const {
    title,
    readyInMinutes,
    servings,
    analyzedInstructions,
    extendedIngredients,
    nutrition
  } = props.recipe;
  if (!Array.isArray(analyzedInstructions) || !props.recipe) {
    return <h4>Loading...</h4>;
  }
  const calories = nutrition.nutrients[0];
  const { percentFat } = nutrition.caloricBreakdown;
  const basicContent = [
    { number: '001', name: 'Time', value: `${readyInMinutes} min` },
    { number: '002', name: 'Servings', value: servings },
    { number: '003', name: calories.name, value: Math.floor(calories.amount) },
    { number: '004', name: 'Fat', value: `${Math.floor(percentFat)}%` }
  ];
  const directInstructions = analyzedInstructions[0].steps;
  const recipeContent = [
    { number: '010', name: 'Ingredients', value: extendedIngredients },
    { number: '020', name: 'Instructions', value: directInstructions }
  ];
  return (
    <>
      <div className="fr-header">
        <h2> { title } </h2>
        <div className="fr-basic">
          <ul className="li-style-none">
            <ListGenerator content={ basicContent } />
          </ul>
        </div>
      </div>
      <div className="fr-ingredients">
        <Accordion data={ recipeContent } />
      </div>
    </>
  );
}
