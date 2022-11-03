import React from 'react';
import ListGenerator from './list-generator';
import Accordion from './accordion';

export default class FullRecipe extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true
    };
  }

  componentDidMount() {
    this.setState({ isLoading: false });
  }

  render() {
    const { recipe } = this.props;
    const { isLoading } = this.state;
    if (isLoading) {
      return <h4>Loading...</h4>;
    }
    const basicContent = [
      { number: '001', name: 'Time', value: recipe.readyInMinutes },
      { number: '002', name: 'Servings', value: recipe.servings },
      { number: '003', name: 'Calories', value: 300 },
      { number: '004', name: 'Place', value: 'holder' }
    ];
    const directInstructions = recipe.analyzedInstructions[0].steps;
    const recipeContent = [
      { number: '010', name: 'Ingredients', value: recipe.extendedIngredients },
      { number: '020', name: 'Instructions', value: directInstructions }
    ];
    return (
      <>
        <div className="fr-header">
          <h2> { recipe.title } </h2>
          <div className="fr-basic">
            <ul className="li-style-none">
              <ListGenerator content={ basicContent } />
            </ul>
          </div>
        </div>
        <div className="fr-ingredients">
          <Accordion data={ recipeContent } />
        </div>
      </>
    );
  }
}
