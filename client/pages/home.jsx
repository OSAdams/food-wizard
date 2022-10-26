import React from 'react';
// eslint-disable-next-line
import Carousel from '../components/carousel';

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      recipes: []
    };
  }

  componentDidMount() {
    fetch('https://api.spoonacular.com/recipes/random?apiKey=633237cc8f324710afa989c4ba9993f0&number=10')
      .then(res => res.json())
      .then(recipes => this.setState({ recipes }))
      .catch(err => console.error({ error: err }));
  }

  updateRecipes(recipes) {
    if (!recipes) {
      return null;
    }
    recipes.map(index => {
      const someObj = { recipeName: index.title, spoonApiLikes: index.aggregateLikes, spoonApiId: index.id };
      fetch('/api/recipes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(someObj)
      })
        .then(res => res.json())
        .then(recipes => null)
        .catch(err => console.error({ error: err }));
      return null;
    });
  }

  render() {
    const { recipes } = this.state;

    if (!recipes.recipes) {
      return <h1>Loading ...</h1>;
    }

    return (
      <Carousel onLoad={ this.updateRecipes(recipes.recipes) } recipes={ recipes.recipes } />
    );
  }
}
