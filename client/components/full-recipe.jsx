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
    const {
      title,
      readyInMinutes,
      servings,
      analyzedInstructions,
      extendedIngredients
    } = this.props.recipe;
    const { isLoading } = this.state;
    if (isLoading) {
      return <h4>Loading...</h4>;
    }
    const basicContent = [
      { number: '001', name: 'Time', value: readyInMinutes },
      { number: '002', name: 'Servings', value: servings },
      { number: '003', name: 'Calories', value: 300 },
      // Pending data to use in object literal. Update name and value
      { number: '004', name: 'Place', value: 'holder' }
    ];
    const directInstructions = analyzedInstructions[0].steps;
    const recipeContent = [
      { number: '010', name: 'Ingredients', value: extendedIngredients },
      { number: '020', name: 'Instructions', value: directInstructions }
    ];
    return (
      <>
        <div className="fr-header">
          <h2> { title } </h2>
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
