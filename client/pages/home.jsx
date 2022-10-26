import React from 'react';
import Carousel from '../components/carousel';

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      recipes: [],
      spoonRecipes: []
    };
  }

  componentDidMount() {
    Promise.all([fetch('api/recipes'), fetch('https://api.spoonacular.com/recipes/random?apiKey=633237cc8f324710afa989c4ba9993f0&number=10')])
      .then(([database, spoonAPI]) => {
        return Promise.all([database.json(), spoonAPI.json()]);
      })
      .then(([dataRes, spoonRes]) => {
        this.setState({ recipes: dataRes, spoonRecipes: spoonRes });
      })
      .catch(err => console.error({ error: err }));
  }

  render() {
    const { recipes, spoonRecipes } = this.state;

    if (!recipes.length || !spoonRecipes.recipes.length) {
      return null;
    }
    // eslint-disable-next-line no-console
    console.log(spoonRecipes.recipes);
    return (
      <Carousel recipes={ recipes } spoonRecipes={ spoonRecipes.recipes } />
    );
  }
}
