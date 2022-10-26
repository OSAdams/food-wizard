import React from 'react';
import RecipeCard from './recipe-card';

export default class Carousel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      iterator: 0
    };
    this.startCarousel = this.startCarousel.bind(this);
    this.resetInterval = this.resetInterval.bind(this);
    this.intervalID = setInterval(this.startCarousel, 4000);
  }

  startCarousel() {
    const { iterator } = this.state;
    const { recipes } = this.props;
    this.resetInterval();
    iterator < recipes.length - 1
      ? this.setState({ iterator: iterator + 1 })
      : this.setState({ iterator: 0 });
  }

  resetInterval() {
    clearInterval(this.intervalID);
    this.intervalID = setInterval(this.startCarousel, 4000);
  }

  ratingRender(para) {
    if (!para) {
      return para;
    }
    return '';
  }

  render() {
    const { iterator } = this.state;
    // eslint-disable-next-line
    const { recipes, spoonRecipes } = this.props;
    return (
      <RecipeCard
        title={ spoonRecipes[iterator].title }
        time={ spoonRecipes[iterator].readyInMinutes }
        diet={ spoonRecipes[iterator].diets[0] }
        servings={ spoonRecipes[iterator].servings }
        likes={ spoonRecipes[iterator].aggregateLikes }
        image={ spoonRecipes[iterator].image } />
    );
  }
}
