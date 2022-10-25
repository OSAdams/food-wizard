import React from 'react';
import Carousel from '../components/carousel';

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
    const { recipes } = this.state;

    if (!recipes.length) {
      return null;
    }
    return (
      <div>
        <Carousel recipes={ recipes } />
      </div>
    );
  }
}
