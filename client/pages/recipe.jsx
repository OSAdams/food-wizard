import React from 'react';
import FullRecipe from '../components/full-recipe';
import Comments from '../pages/comments';

export default class Recipe extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      recipe: []
    };
  }

  componentDidMount() {
    const { recipeId } = this.props;
    fetch(`https://api.spoonacular.com/recipes/${recipeId}/information?apiKey=${process.env.SPOONACULAR_API_KEY}&includeNutrition=true`)
      .then(res => res.json())
      .then(recipe => this.setState({ recipe }))
      .catch(err => console.error({ error: err }));
  }

  render() {
    // eslint-disable-next-line
    const { state: { recipe }, props: { recipeId } } = this;
    console.log(recipe); // eslint-disable-line
    return (
      <>
        <div className="full-recipe-container">
          <FullRecipe recipe={ recipe } />
        </div>
        <Comments recipeId={ recipe.id } />
      </>
    );
  }
}
