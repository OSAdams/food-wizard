import React from 'react';
import FullRecipe from '../components/full-recipe';

export default class Recipe extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      recipe: []
    };
  }

  componentDidMount() {
    const recipeId = window.location.hash.substring(11);
    fetch(`https://api.spoonacular.com/recipes/${recipeId}/information?apiKey=${process.env.SPOONACULAR_API_KEY}&addRecipeInformation=true`)
      .then(res => res.json())
      .then(recipe => this.setState({ recipe }))
      .catch(err => console.error({ error: err }));
  }

  render() {
    const { recipe } = this.state;
    return (
      <div className="full-recipe-container">
        <FullRecipe recipe={ recipe } />
      </div>
    );
  }
}
