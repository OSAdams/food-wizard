import React from 'react';
import CommentForm from '../components/comment-form';

export default class Comments extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      recipeId: null
    };
  }

  componentDidMount() {
    const { recipeId } = this.props;
    fetch(`/api/comments/${recipeId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => res.json())
      .then(recipeId => {
        this.setState({ recipeId });
      })
      .catch(err => console.error({ error: err }));
  }

  render() {
    console.log(this.state.recipeId); // eslint-disable-line
    return (
      <div className="comment-title text-align-center">
        <CommentForm />
      </div>
    );
  }
}

// Container
// -- Accordion
// -- -- CommentCards
