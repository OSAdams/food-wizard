import React from 'react';
import FullRecipe from '../components/full-recipe';

export default class Recipe extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      recipe: []
    };
  }

  componentDidMount() {
    const recipe = localStorage.getItem('user-full-recipe');
    if (!recipe) {
      return (
        <div className="error-placeholder">
          <h3>Error:</h3>
          <p>Error Placeholder some text some text some text some text</p>
        </div>
      );
    }
    const parsedRecipe = JSON.parse(recipe);
    // eslint-disable-next-line
    console.log(parsedRecipe);
  }

  render() {
    return <FullRecipe />;
  }
}
