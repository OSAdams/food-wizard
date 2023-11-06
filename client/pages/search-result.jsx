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
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    const keyword = this.props.keyword;
    fetch(`https://api.spoonacular.com/recipes/complexSearch?query=${keyword}&apiKey=${process.env.SPOONACULAR_API_KEY}&number=10&addRecipeNutrition=true&instructionsRequired=true`)
      .then(res => res.json())
      .then(recipes => this.setState({ recipes }))
      .catch(err => console.error({ error: err }));
  }

  handleClick(event) {
    const { id } = event.target;
    const { context: { route: { params } } } = this;
    params.set('recipeId', id);
    window.location.hash = `recipes?${params.toString()}`;
  }

  render() {
    if (this.state.recipes.length < 1) {
      return <LoadingModal />;
    }
    const {
      state: {
        recipes: { results }
      },
      handleClick
    } = this;
    const recipeTitles = results.map(index => {
      return (
        <RecipeCard
          key={ index.id }
          id={ index.id }
          title={ index.title }
          servings={ index.servings }
          likes={ index.aggregateLikes }
          image={ index.image }
          time={ index.readyInMinutes }
          diet={ index.diets }
          methods={ [handleClick] } />
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
