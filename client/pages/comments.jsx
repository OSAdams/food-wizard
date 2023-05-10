import React from 'react';
import CommentForm from '../components/comment-form';
import CommentCards from '../components/comment-cards';
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
    const id = recipeId.split('&');
    const spoonApiId = id[0];
    fetch(`/api/recipes/spoonApiId/${spoonApiId}`, {
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
  }

  render() {
    if (!this.state.recipe) {
      return <LoadingModal />;
    }
    const { recipe: { recipeId } } = this.state;
    return (
      <section className="comments-section">
        <div className="comments-section-header" style={{ textAlign: 'center' }}>
          <h2>Comments</h2>
        </div>
        <div className="comments-container">
          <CommentCards recipeId= { recipeId } />
        </div>
        <div className="comment-form-container text-align-center" style={{ marginBottom: '2rem' }}>
          <CommentForm recipeId={ recipeId }/>
        </div>
      </section>
    );
  }
}
