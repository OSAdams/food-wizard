import React from 'react';
import FullRecipe from '../components/full-recipe';
import AppContext from '../lib/app-context';

export default class Recipe extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      recipe: []
    };
  }

  componentDidMount() {
    // what the heck is even this
    const { props: { recipeId } } = this;
    const id = recipeId.split('&');
    const ourId = id[0];
    fetch(`/api/recipepage/fullrecipe/recipe/${ourId}`)
      .then(res => res.json())
      .then(recipe => {
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
