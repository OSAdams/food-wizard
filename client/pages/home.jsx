import React from 'react';
import RecipeCard from '../components/recipe-card';

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      recipe: {
        recipeTitle: 'Test Bread',
        recipeCalories: 205,
        recipeTime: 45,
        recipeCuisine: 'american',
        recipeRating: 3
      }
    };
  }

  render() {
    const { recipe } = this.state;
    return (
      <div>
        <RecipeCard
          title={ recipe.recipeTitle }
          calories={ recipe.recipeCalories }
          time={ recipe.recipeTime }
          cuisine={ recipe.recipeCuisine }
          rating={ recipe.recipeRating }/>
      </div>
    );
  }
}
