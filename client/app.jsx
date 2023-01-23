import React from 'react';
import Home from './pages/home';
import Recipe from './pages/recipe';
import { parseRoute } from './lib';
import NavBar from './components/navbar';
import Search from './pages/search';
import UnderConstruction from './pages/under-construction';
import PageContainer from './components/page-container';

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
    if (route.path === '' || route.path === '#' || route.path === 'home') {
      return <Home />;
    }
    if (route.path === 'recipeId') {
      return <Recipe recipeId={ route.queryString } />;
    }
    if (route.path === 'keyword') {
      return <Search key={ route.queryString } keyword={ route.queryString } />;
    }
    return <UnderConstruction />;
  }

  render() {
    return (
      <div className="main-container flex f-dir-col">
        <NavBar />
        <PageContainer>
          { this.renderPage() }
        </PageContainer>
      </div>
    );
  }
}
