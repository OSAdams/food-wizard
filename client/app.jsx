import React from 'react';
import jwtDecode from 'jwt-decode';
import AppContext from './lib/app-context';
import { parseRoute } from './lib';
import NavBar from './components/navbar';
import PageContainer from './components/page-container';
import AuthForm from './components/auth-form';
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
    const token = window.localStorage.getItme('food-wizard-jwt');
    const user = token ? jwtDecode(token) : null;
    this.setState({ user, isAuthorizing: false });
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
      return <AuthForm action={ queryString } />;
    }
    return (
      <div className="flex f-justify-content-center">
        <UnderConstruction />
      </div>
    );
  }

  render() {
    if (this.state.isAuthorizing) return null;
    const { user, route } = this.state;
    const { handleSignIn, handleSignOut } = this;
    const contextValue = { user, route, handleSignIn, handleSignOut };
    return (
      <AppContext.Provider value={contextValue}>
        <div className="main-container flex f-dir-col">
          <NavBar />
          <PageContainer>
            { this.renderPage() }
          </PageContainer>
        </div>
      </AppContext.Provider>
    );
  }
}
