import React from 'react';
import ListGenerator from './list-generator';

export default function FullRecipe(props) {
  const { recipe } = props;
  const basicContent = [
    { number: '001', name: 'Time', value: recipe.readyInMinutes },
    { number: '002', name: 'Servings', value: recipe.servings },
    { number: '003', name: 'Calories', value: 300 },
    { number: '004', name: 'Place', value: 'holder' }
  ];
  // eslint-disable-next-line
  console.log(recipe);
  return (
    <div className="fr-header">
      <h2> { recipe.title } </h2>
      <div className="fr-basic">
        <ListGenerator content={basicContent} />
      </div>
    </div>
  );
}
