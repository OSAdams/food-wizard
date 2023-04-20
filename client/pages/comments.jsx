import React from 'react';
import CommentForm from '../components/comment-form';
// import CommentCards from '../components/comment-cards';
import LoadingModal from '../components/loading-modal';

export default class Comments extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      recipe: null
    };
  }

  componentDidMount() {
    const { props: { recipeId } } = this;
    // const spoonHeader = {
    //   method: 'GET',
    //   headers: {
    //     'Content-Type': 'application/json'
    //   }
    // };
    fetch(`/api/recipes/spoonApiId/${recipeId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => res.json())
      .then(recipe => {
        this.setState({ recipe });
      })
      .catch(err => console.error({ error: err }));
    // const promises = Promise.all([
    //   fetch(`/api/recipes/spoonApiId/${recipeId}`, spoonHeader)
    // ]);
    // promises.then(results => {
    //   Promise.all(this.setState({ recipeId: results }));
    // });
  }

  render() {
    if (!this.state.recipe) {
      return <LoadingModal />;
    }
    const { recipe: recipeId } = this.state;
    console.log('recipe: ', this.state.recipe); // eslint-disable-line
    return (
      <>
        <div className="comments-container">
          {/* <CommentCards recipeId= { recipeId.recipeId } /> */}
        </div>
        <div className="comment-form-container text-align-center" style={{ marginBottom: '2rem' }}>
          <CommentForm recipeId={ recipeId.recipeId }/>
        </div>
      </>
    );
  }
}

// Container
// -- Accordion
// -- -- CommentCards
