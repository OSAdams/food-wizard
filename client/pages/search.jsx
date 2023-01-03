import React from 'react';
import RecipeCard from '../components/recipe-card';

export default class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      recipes: []
    };
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    // eslint-disable-next-line
    const keyword = this.props.keyword;
    fetch(`https://api.spoonacular.com/recipes/complexSearch?query=${keyword}&apiKey=${process.env.SPOONACULAR_API_KEY}&number=10&addRecipeNutrition=true`)
      .then(res => res.json())
      .then(recipes => this.setState({ recipes }))
      .catch(err => console.error({ error: err }));
  }

  handleClick(event) {
    const { id } = event.target;
    window.location.hash = `recipeId?${id}`;
  }

  render() {
    if (this.state.recipes.length < 1) {
      return <h1>Loading...</h1>;
    }
    const { results } = this.state.recipes;
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
          diet={ index.diets } />
      );
    });
    return (
      <div className="search-recipe-render" onClick={this.handleClick}>
        { recipeTitles }
      </div>
    );
  }
}
