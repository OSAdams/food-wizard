import React from 'react';
import RecipeCard from '../components/recipe-card';
import LoadingModal from '../components/loading-modal';
import AppContext from '../lib/app-context';
import { dbPostRecipe } from '../lib'; // eslint-disable-line

export default class SearchResult extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      recipes: []
    };
  }

  componentDidMount() {
    const keyword = this.props.keyword;
    fetch(`https://api.spoonacular.com/recipes/complexSearch?query=${keyword}&apiKey=${process.env.SPOONACULAR_API_KEY}&number=10&addRecipeNutrition=true&instructionsRequired=true`)
      .then(res => res.json())
      .then(recipes => this.setState({ recipes }))
      .catch(err => console.error({ error: err }));
  }

  /*
  WORK IN HERE GOOBER. CANNOT CLICK RECIPES ON SEARCH RESULT TO OPEN THE RECIPE.
  */

  render() {
    if (this.state.recipes.length < 1) {
      return <LoadingModal />;
    }
    const { state: { recipes: { results } }, context: { route: { params } } } = this; // eslint-disable-line
    console.log('results: ', results); // eslint-disable-line
    const recipeTitles = results.map(index => {
      // const handleClick // handle click
      // = (recipeId, recipeTitle) => {
      //  params.set('recipeId', recipeId)
      //  window.location.hash = `recipe?${params.toString()}`
      //  dbPostRecipe(recipeId, recipeTitle)
      // }
      return (
        <RecipeCard
          key={ index.id }
          id={ index.id }
          title={ index.title }
          servings={ index.servings }
          likes={ index.aggregateLikes }
          image={ index.image }
          time={ index.readyInMinutes }
          diet={ index.diets } />
      );
    });
    return (
      <div className="search-recipe-render">
        { recipeTitles }
      </div>
    );
  }
}

SearchResult.contextType = AppContext;
