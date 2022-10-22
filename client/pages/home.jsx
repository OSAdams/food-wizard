import React from 'react';
// import RecipeCard from '../components/recipe-card';
// import { getRandomArbitrary } from '../lib';

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      recipes: []
    };
  }

  componentDidMount() {
    fetch('/api/recipes')
      .then(res => res.json())
      .then(recipes => this.setState({ recipes }))
      .catch(err => console.error({ error: err }));
  }

  render() {
    // eslint-disable-next-line
    const { recipes } = this.state;
    return (
      <div>
        <p>jaoisdasd</p>
        {/* <RecipeCard
          title={ recipes[0].recipeName }
          calories={ getRandomArbitrary(200, 500) }
          time={ getRandomArbitrary(15, 60) }
          cuisine={`id: ${recipes[0].recipeId} -- spoon: ${recipes[0].spoonApiId}`}
          rating={ recipes[0].recipeRating }/> */}
      </div>
    );
  }
}
