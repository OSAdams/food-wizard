import React from 'react';
import RecipeCard from './recipe-card';
import dbPostRecipe from '../lib/db-post-recipe';

export default class Carousel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      iterator: 0
    };
    this.startCarousel = this.startCarousel.bind(this);
    this.resetInterval = this.resetInterval.bind(this);
    this.loadRecipe = this.loadRecipe.bind(this);
    this.navigateCarousel = this.navigateCarousel.bind(this);
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

  loadRecipe(event) {
    const { iterator } = this.state;
    const { recipes } = this.props;
    this.resetInterval();
    window.location.hash = `recipes?recipeId=${recipes[iterator].id}&newComment=null&isEditing=null`;
    dbPostRecipe(recipes[iterator].id, recipes[iterator].title);
  }

  navigateCarousel(event) {
    const { iterator } = this.state;
    const { recipes } = this.props;
    const { className, parentNode } = event.target;
    const carouselClassNames = {
      cycleLeft: {
        icon: 'fa-sharp fa-solid fa-arrow-left txt-shadow',
        parent: 'carousel-controls pos-absolute carousel-previous'
      },
      cycleRight: {
        icon: 'fa-sharp fa-solid fa-arrow-right txt-shadow',
        parent: 'carousel-controls pos-absolute carousel-next'
      }
    };
    this.resetInterval();
    if (className === carouselClassNames.cycleRight.parent || parentNode.className === carouselClassNames.cycleRight.parent || className === carouselClassNames.cycleRight.icon) {
      iterator === recipes.length - 1
        ? this.setState({ iterator: 0 })
        : this.setState({ iterator: iterator + 1 });
    } else if (className === carouselClassNames.cycleLeft.parent || parentNode.className === carouselClassNames.cycleLeft.parent || className === carouselClassNames.cycleLeft.icon) {
      iterator === 0
        ? this.setState({ iterator: recipes.length - 1 })
        : this.setState({ iterator: iterator - 1 });
    }
  }

  render() {
    const { iterator } = this.state;
    const { recipes } = this.props;
    const { navigateCarousel, loadRecipe } = this;
    return (
      <div className='carousel-container pos-relative'>
        <div className='carousel-recipe-card'>
          <RecipeCard
              methods={[loadRecipe]}
              title={recipes[iterator].title}
              time={recipes[iterator].readyInMinutes}
              diet={recipes[iterator].diets}
              servings={recipes[iterator].servings}
              likes={recipes[iterator].aggregateLikes}
              image={recipes[iterator].image} />
        </div>
        <div className='carousel-controls pos-absolute carousel-previous'>
          <button onClick={navigateCarousel} type='button'>
            <i className='fa-sharp fa-solid fa-arrow-left txt-shadow' />
          </button>
        </div>
        <div className='carousel-controls pos-absolute carousel-next'>
          <button onClick={ navigateCarousel } type='button'>
            <i className='fa-sharp fa-solid fa-arrow-right txt-shadow' />
          </button>
        </div>
      </div>
    );
  }
}
