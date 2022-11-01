import React from 'react';

export default function FullRecipe(props) {
  // eslint-disable-next-line
  const { recipe } = props
  return (
    <div className="full-recipe">
      <h2> {recipe.title} </h2>
    </div>
  );
}
