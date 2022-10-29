import React from 'react';
import Home from './pages/home';
import Recipe from './pages/recipe';
import { parseRoute } from './lib';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      route: parseRoute(window.location.hash)
    };
  }

  componentDidMount() {
    window.addEventListener('hashchange', () => this.setState({ route: parseRoute(window.location.hash) }));
  }

  renderPage() {
    const { route } = this.state;
    if (route.path === '' || route.path === '#') {
      return <Home />;
    }
    if (route.path === 'recipe') {
      return <Recipe />;
    }
    return null;
  }

  render() {
    return this.renderPage();
  }
}
