import React from 'react';
import ListGenerator from './list-generator';
import Accordion from './accordion';
import LoadingModal from './loading-modal';
import { dbPostRecipe } from '../lib';

export default function FullRecipe(props) {
  const {
    title,
    readyInMinutes,
    servings,
    analyzedInstructions,
    extendedIngredients,
    nutrition,
    id,
    image
  } = props.recipe;
  if (!Array.isArray(analyzedInstructions) || !props.recipe) {
    return <LoadingModal />;
  }
  dbPostRecipe(id, title);
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
    <div className="full-recipe-container">
      <section className="basic-recipe-data">
        <div className="fr-image">
          <img
        src={image}
        alt={`Image of ${title}`}
      />
        </div>
        <div className="fr-basic">
          <div className="fr-header">
            <h1> {title} </h1>
          </div>
          <ul className="list-style-none text-align-center">
            <ListGenerator content={ basicContent } />
          </ul>
        </div>
      </section>
      <div className="fr-ingredients">
        <Accordion data={ recipeContent } />
      </div>
    </div>
  );
}
