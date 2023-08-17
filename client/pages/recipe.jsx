import React from 'react';
import FullRecipe from '../components/full-recipe';
import AppContext from '../lib/app-context';
import { dbPostRecipe } from '../lib'; // bye bye

export default class Recipe extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      recipe: []
    };
  }

  componentDidMount() {
    const { props: { recipeId } } = this;
    console.log('componentDidMount props in Recipe: ', recipeId); // eslint-disable-line
    const id = recipeId.split('&');
    const spoonApiId = id[0];
    fetch(`https://api.spoonacular.com/recipes/${spoonApiId}/information?apiKey=${process.env.SPOONACULAR_API_KEY}&includeNutrition=true`)
      .then(res => res.json())
      .then(recipe => {
        const { id, title } = recipe;
        dbPostRecipe(id, title); // get this out of here
        this.setState({ recipe });
      })
      .catch(err => console.error({ error: err }));
  }

  render() {
    const { state: { recipe } } = this;
    return <FullRecipe recipe={ recipe } />;
  }
}

Recipe.contextType = AppContext;
