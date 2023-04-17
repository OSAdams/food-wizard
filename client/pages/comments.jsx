import React from 'react';
import CommentForm from '../components/comment-form';
import CommentCard from '../components/comment-card';
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
    return (
      <>
        <div className="comments-container">
          <CommentCard username="henry" date="today" content="Salamander Beans" />
        </div>
        <div className="comment-title text-align-center" style={{ marginBottom: '2rem' }}>
          <CommentForm recipeId={ recipeId.recipeId }/>
        </div>
      </>
    );
  }
}

// Container
// -- Accordion
// -- -- CommentCards
