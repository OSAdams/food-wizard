import React from 'react';
import RecipeCard from '../components/recipe-card';
import LoadingModal from '../components/loading-modal';
import AppContext from '../lib/app-context';

export default class SearchResult extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      recipes: []
    };
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    const keyword = this.props.keyword;
    fetch(`/api/recipes/spoonacular/${keyword}`)
      .then(res => res.json())
      .then(recipes => {
        this.setState({ recipes });
      })
      .catch(err => console.error({ error: err }));
  }

  handleClick(event) {
    // this should be used strictly in here and not on the recipe card render.
    const { id, textContent } = event.target;
    const { context: { route: { params } } } = this;
    params.set('recipeId', id);
    params.set('isEditing', 'null');
    window.location.hash = `recipes?${params.toString()}`;
    const reqBody = {
      spoonApiId: id,
      recipeName: textContent
    };
    const data = JSON.stringify(reqBody);
    // what the fuck is this even doing here.. We don't need to post the recipe to our database from here.
    fetch('/api/recipes',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: data
      })
      .catch(err => console.error({ error: err }));
  }

  render() {
    if (this.state.recipes.length < 1) {
      return <LoadingModal />;
    }
    const {
      state: {
        recipes
      },
      handleClick
    } = this;
    const recipeTitles = recipes.map(index => {

      // remove the onclick from the recipe card and have the onclick HERE
      return (
        <RecipeCard
          key={ index.id }
          id={ index.id }
          title={ index.title }
          servings={ index.servings }
          likes={ index.aggregateLikes }
          image={ index.image }
          time={ index.readyInMinutes }
          diet={ index.diets }
          methods={ [handleClick] } />
      );
    });
    return (
      <div>
        <h1 className="text-align-center">Search results for &quot;{this.props.keyword}&quot;</h1>
        <div className="search-recipe-render">
          { !recipes.length ? <h2 className="marg-auto text-align-center">Not found! Use a different search string</h2> : recipeTitles }
        </div>
      </div>
    );
  }
}

SearchResult.contextType = AppContext;
