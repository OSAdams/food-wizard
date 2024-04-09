import React from 'react';
import CommentForm from '../components/comment-form';
import CommentCards from '../components/comment-cards';
import LoadingModal from '../components/loading-modal';
import AppContext from '../lib/app-context';

export default class Comments extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      recipe: null
    };
  }

  componentDidMount() {
    const { props: { recipeId }, context: { route: { path, params } } } = this;
    let spoonApiId = recipeId;
    if (recipeId.includes('&')) {
      const id = recipeId.split('&');
      spoonApiId = id[0];
    }
    fetch(`/api/recipes/spoonApiId/${spoonApiId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => {
        if (!res.ok) {
          return false;
        }
        return res.json();
      })
      .then(recipe => {
        params.set('newComment', 'false');
        window.location.hash = `${path}?${params.toString()}`;
        setTimeout(() => {
          this.setState({ recipe });
        }, 500);
      })
      .catch(err => console.error({ error: err }));
  }

  render() {
    if (this.state.recipe === null) {
      return <LoadingModal />;
    }
    const {
      recipe: {
        recipeId
      }
    } = this.state;
    return (
      <section className="comments-section">
        <div className="comment-form-container text-align-center" style={{ marginBottom: '1rem', paddingTop: '1rem' }}>
          <CommentForm recipeId={recipeId} />
        </div>
        <div className="comments-section-header" style={{ textAlign: 'center', fontSize: 'larger' }}>
          <p>Comments</p>
        </div>
        <div className="comments-container">
          <CommentCards recipeId={recipeId} spoonApiId={this.props.recipeId} />
        </div>
      </section>
    );
  }
}

Comments.contextType = AppContext;
