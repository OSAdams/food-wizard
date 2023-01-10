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
    this.carouselControls = this.carouselControls.bind(this);
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

  carouselControls(event) {
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
      const reqBody = {
        recipeName: recipes[iterator].title,
        spoonApiLikes: recipes[iterator].aggregateLikes,
        spoonApiId: recipes[iterator].id
      };
      const data = JSON.stringify(reqBody);
      fetch('/api/recipes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: data
      })
        .then(res => {
          window.location.hash = `recipeId?${recipes[iterator].id}`;
          return null;
        })
        .catch(err => console.error({ error: err }));
    }
  }

  render() {
    const { iterator } = this.state;
    const { recipes } = this.props;
    return (
      <div onClick={this.carouselControls} className="carousel-container">
        <RecipeCard
          title={recipes[iterator].title}
          time={recipes[iterator].readyInMinutes}
          diet={recipes[iterator].diets}
          servings={recipes[iterator].servings}
          likes={recipes[iterator].aggregateLikes}
          image={recipes[iterator].image} />
        <i className='fa-sharp fa-solid fa-arrow-left txt-shadow' id='cara-prev' />
        <i className='fa-sharp fa-solid fa-arrow-right txt-shadow' id='cara-next' />
      </div>
    );
  }
}
