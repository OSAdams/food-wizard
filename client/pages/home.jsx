import React from 'react';
import Carousel from '../components/carousel';
import LoadingModal from '../components/loading-modal';
import AppContext from '../lib/app-context';

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      recipes: []
    };
  }

  componentDidMount() {
    fetch(`https://api.spoonacular.com/recipes/random?apiKey=${process.env.SPOONACULAR_API_KEY}&number=10`)
      .then(res => res.json())
      .then(recipes => this.setState({ recipes }))
      .catch(err => console.error({ error: err }));
  }

  render() {
    const { recipes } = this.state;
    const { user } = this.context;
    if (!recipes.recipes) {
      return <LoadingModal />;
    }
    return (
      <>
        <h2 className="text-align-center">{ user ? `Welcome ${user.username}!` : 'Welcome!' }</h2>
        <h4 className="text-align-center">Cycle through the carousel or<br />search using keywords!</h4>
        <Carousel recipes={ recipes.recipes } />
      </>
    );
  }
}

Home.contextType = AppContext;
