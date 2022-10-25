import React from 'react';
import RecipeCard from '../components/recipe-card';

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      recipes: []
    };
  }

  componentDidMount() {
    fetch('/api/recipes')
      .then(res => res.json())
      .then(recipes => this.setState({ recipes }))
      .catch(err => console.error({ error: err }));
  }

  render() {
    const { recipes } = this.state;

    if (!recipes.length) {
      return null;
    }
    return (
      <div>
        <RecipeCard
          title={recipes[4].recipeName}
          calories={ recipes[4].spoonApiId }
          time={ recipes[4].recipeId }
          cuisine="JavaScript"
          rating={ recipes[4].recipeRating }/>
      </div>
    );
  }
}
