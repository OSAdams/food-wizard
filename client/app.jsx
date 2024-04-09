import React from 'react';
import jwtDecode from 'jwt-decode';
import AppContext from './lib/app-context';
import { parseRoute } from './lib';
import NavBar from './components/navbar';
import Auth from './pages/auth';
import SearchResult from './pages/search-result';
import UnderConstruction from './pages/under-construction';
import Home from './pages/home';
import Recipe from './pages/recipe';
import SignOut from './components/sign-out';
import Comments from './pages/comments';
import LineBreak from './components/line-break';

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
    window.localStorage.removeItem('food-wizard-jwt');
    this.setState({ user: null });
    window.location.hash = 'home';
  }

  renderPage() {
    const { path, params } = this.state.route;
    if (path === '' || path === '#' || path === 'home') {
      return <Home />;
    }
    if (path === 'recipes') {
      const recipeId = params.get('recipeId');
      const newComment = params.get('newComment');
      const isEditing = params.get('isEditing');
      return (
        <>
          <Recipe recipeId={ recipeId } />
          <LineBreak />
          <Comments
            recipeId={ recipeId }
            key={ newComment }
            isEditing={ isEditing } />
        </>
      );
    }
    if (path === 'quickSearch') {
      const keyword = params.get('keyword');
      return <SearchResult key={ keyword } keyword={ keyword } />;
    }
    if (path === 'sign-up' || path === 'sign-in') {
      return <Auth action={ path } />;
    }
    if (path === 'sign-out') {
      return <SignOut />;
    }
    return (
      <div className="flex f-justify-content-center">
        <UnderConstruction />
      </div>
    );
  }

  render() {
    if (this.state.isAuthorizing) return null;
    const { state: { user, route }, handleSignIn, handleSignOut } = this;
    const contextValue = { user, route, handleSignIn, handleSignOut };
    return (
      <AppContext.Provider value={contextValue}>
        <div className="main-container flex f-justify-content-center f-dir-col">
          <NavBar />
          <div className="page-container">
            { this.renderPage() }
          </div>
        </div>
      </AppContext.Provider>
    );
  }
}
