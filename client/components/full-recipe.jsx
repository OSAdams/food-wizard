import React from 'react';
import ListGenerator from './list-generator';
import Accordion from './accordion';
import LoadingModal from './loading-modal';

function onLoad(spoonId, title) {
  const reqBody = {
    recipeName: title,
    spoonApiId: spoonId
  };
  const data = JSON.stringify(reqBody);
  fetch('/api/recipes', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: data
  })
    .catch(err => console.error({ error: err }));
}

export default function FullRecipe(props) {
  const {
    title,
    readyInMinutes,
    servings,
    analyzedInstructions,
    extendedIngredients,
    nutrition,
    id
  } = props.recipe;
  if (!Array.isArray(analyzedInstructions) || !props.recipe) {
    return <LoadingModal />;
  }
  onLoad(id, title);
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
        <div className="fr-basic flex">
          <ul className="li-style-none flex f-wrap-wrap">
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
