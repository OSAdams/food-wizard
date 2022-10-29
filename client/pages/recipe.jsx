import React from 'react';
import RecipeData from '../components/recipe-data';

export default class Recipe extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      recipe: []
    };
    this.handleLoad = this.handleLoad.bind(this);
  }

  handleLoad() {
    const carouselRecipe = localStorage.getItem('clicked-carousel-recipe');
    if (!carouselRecipe) {
      return <h1>Error: Unable to grab recipe from local storage</h1>;
    }
    // eslint-disable-next-line
    console.log(carouselRecipe);
    const parsedRecipe = JSON.parse(carouselRecipe);
    // eslint-disable-next-line
    console.log(parsedRecipe);
    this.setState({ recipe: parsedRecipe });
  }

  render() {
    return <RecipeData recipe={this.state} onLoad={this.handleLoad} />;
  }
}
