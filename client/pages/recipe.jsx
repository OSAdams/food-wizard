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
    const recipe = localStorage.getItem('user-full-recipe');
    if (!recipe) {
      return null;
    }
    const parsedRecipe = JSON.parse(recipe);
    const reqBody = {
      recipeName: parsedRecipe.title,
      spoonApiLikes: parsedRecipe.aggregateLikes,
      spoonApiId: parsedRecipe.id
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
    this.setState({ recipe: parsedRecipe });
    return null;
  }

  render() {
    const { recipe } = this.state;
    return <FullRecipe recipe={ recipe } />;
  }
}
