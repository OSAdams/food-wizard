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
    const recipeId = this.props.recipeId;
    fetch(`https://api.spoonacular.com/recipes/${recipeId}/information?apiKey=${process.env.SPOONACULAR_API_KEY}&includeNutrition=true`)
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
