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
    const { params } = this.context.route;
    fetch(`https://api.spoonacular.com/recipes/random?apiKey=${process.env.SPOONACULAR_API_KEY}&number=10`)
      .then(res => res.json())
      .then(recipes => this.setState({ recipes }))
      .catch(err => console.error({ error: err }));
    params.set('showMenu', 'false');
    window.location.hash = `home?${params.toString()}`;
  }

  render() {
    const { recipes } = this.state;
    const { user } = this.context;
    if (!recipes.recipes) {
      return <LoadingModal />;
    }
    return (
      <>
        <div>
          <h1 className="text-align-center">Food Wizard</h1>
          <p className="text-align-center">{ user ? `Welcome ${user.username}!` : 'Welcome!' }</p>
          <p className="text-align-center">Cycle through the carousel or<br />search using keywords!</p>
        </div>
        <Carousel recipes={ recipes.recipes } />
      </>
    );
  }
}

Home.contextType = AppContext;
