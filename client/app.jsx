import React from 'react';
import jwtDecode from 'jwt-decode';
import AppContext from './lib/app-context';
import { parseRoute } from './lib';
import NavBar from './components/navbar';
import Container from './components/container';
import Auth from './pages/auth';
import SearchResult from './pages/search-result';
import UnderConstruction from './pages/under-construction';
import Home from './pages/home';
import Recipe from './pages/recipe';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      isAuthorizing: true,
      route: parseRoute(window.location.hash)
    };
    this.handleSignIn = this.handleSignIn.bind(this);
    this.handleSignOut = this.handleSignOut.bind(this);
  }

  componentDidMount() {
    window.addEventListener('hashchange', () => {
      this.setState({
        route: parseRoute(window.location.hash)
      });
    });
    const token = window.localStorage.getItem('food-wizard-jwt');
    const user = token ? jwtDecode(token) : null;
    this.setState({ user, isAuthorizing: false });
  }

  handleSignIn(result) {
    const { user, token } = result;
    window.localStorage.setItem('food-wizard-jwt', token);
    this.setState({ user });
  }

  handleSignOut() {
    window.localStorage.removeItem('react-context-jwt');
    this.setState({ user: null });
  }

  renderPage() {
    const { path, queryString } = this.state.route;
    if (path === '' || path === '#' || path === 'home') {
      return <Home />;
    }
    if (path === 'recipeId') {
      return <Recipe recipeId={ queryString } />;
    }
    if (path === 'keyword') {
      return <SearchResult key={ queryString } keyword={ queryString } />;
    }
    if (path === 'sign-up' || path === 'sign-in') {
      return <Auth action={ queryString } />;
    }
    return (
      <Container className="flex f-justify-content-center">
        <UnderConstruction />
      </Container>
    );
  }

  render() {
    if (this.state.isAuthorizing) return null;
    const { user, route } = this.state;
    const { handleSignIn, handleSignOut } = this;
    const contextValue = { user, route, handleSignIn, handleSignOut };
    return (
      <AppContext.Provider value={contextValue}>
        <Container className="main-container flex f-dir-col">
          <NavBar />
          <Container className="page-container">
            { this.renderPage() }
          </Container>
        </Container>
      </AppContext.Provider>
    );
  }
}
