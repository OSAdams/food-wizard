import React from 'react';
import RecipeCard from './recipe-card';
import IconGenerator from './icon-generator';

export default class Carousel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      iterator: 0
    };
    this.startCarousel = this.startCarousel.bind(this);
    this.resetInterval = this.resetInterval.bind(this);
    this.cycleCarousel = this.cycleCarousel.bind(this);
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

  cycleCarousel(event) {
    const { iterator } = this.state;
    const { recipes } = this.props;
    const { id } = event.target;
    this.resetInterval();
    if (id === 'cara-next') {
      iterator === recipes.length - 1
        ? this.setState({ iterator: 0 })
        : this.setState({ iterator: iterator + 1 });
    } else if (id === 'cara-prev') {
      iterator === 0
        ? this.setState({ iterator: recipes.length - 1 })
        : this.setState({ iterator: iterator - 1 });
    } else {
      const saveCarouselRecipe = JSON.stringify(recipes[iterator]);
      localStorage.setItem('clicked-carousel-recipe', saveCarouselRecipe);
      window.location.hash = '#recipe';
    }
  }

  render() {
    const { iterator } = this.state;
    const { recipes } = this.props;
    return (
      <div onClick={this.cycleCarousel} className="carousel-container">
        <RecipeCard
          onClick = { this.handleRecipeClick }
          title={recipes[iterator].title}
          time={recipes[iterator].readyInMinutes}
          diet={recipes[iterator].diets}
          servings={recipes[iterator].servings}
          likes={recipes[iterator].aggregateLikes}
          image={recipes[iterator].image} />
        <IconGenerator className='fa-sharp fa-solid fa-arrow-left txt-shadow' id='cara-prev' />
        <IconGenerator className='fa-sharp fa-solid fa-arrow-right txt-shadow' id='cara-next' />
      </div>
    );
  }
}
