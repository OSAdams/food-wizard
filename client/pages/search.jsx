import React from 'react';
import RecipeCard from '../components/recipe-card';

export default class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      recipes: []
    };
  }

  componentDidMount() {
    // eslint-disable-next-line
    const keyword = this.props.keyword;
    fetch(`https://api.spoonacular.com/recipes/complexSearch?query=${keyword}&apiKey=${process.env.SPOONACULAR_API_KEY}&number=10&addRecipeNutrition=true`)
      .then(res => res.json())
      .then(recipes => this.setState({ recipes }))
      .catch(err => console.error({ error: err }));
  }

  render() {
    if (this.state.recipes.length < 1) {
      return <h1>WhAt&apos;S gOiNg On HeRe</h1>;
    }
    const { results } = this.state.recipes;
    // eslint-disable-next-line
    console.log(results);
    const recipeTitles = results.map(index => {
      return (
        <RecipeCard
          key={ index.id }
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
