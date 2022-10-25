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

  render() {
    const { iterator } = this.state;
    const { recipes } = this.props;
    return (
      <RecipeCard
        title={ recipes[iterator].recipeName }
        calories={ recipes[iterator].recipeId }
        time={ recipes[iterator].spoonApiId }
        cuisine="JavaScript"
        rating={ recipes[iterator].recipeRating } />
    );
  }
}
