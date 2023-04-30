import React from 'react';
import FullRecipe from '../components/full-recipe';
import Comments from '../pages/comments';
import AppContext from '../lib/app-context';

export default class Recipe extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      recipe: [],
      method: null
    };
  }

  componentDidMount() {
    const {
      props: {
        recipeId
      }
    } = this;
    fetch(`https://api.spoonacular.com/recipes/${recipeId}/information?apiKey=${process.env.SPOONACULAR_API_KEY}&includeNutrition=true`)
      .then(res => res.json())
      .then(recipe => this.setState({ recipe }))
      .catch(err => console.error({ error: err }));
  }

  render() {
    const {
      state: {
        recipe
      },
      props: {
        recipeId
      }
    } = this;
    console.log('this.AppContext in recipe: ', this.context); // eslint-disable-line
    return (
      <>
        <div className="full-recipe-container">
          <FullRecipe recipe={ recipe } />
        </div>
        <Comments recipeId={ recipeId } />
      </>
    );
  }
}

Recipe.contextType = AppContext;
