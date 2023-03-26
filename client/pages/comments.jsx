import React from 'react';
import CommentForm from '../components/comment-form';

export default class Comments extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      placeholder: null
    };
  }

  render() {
    return (
      <>
        <div className="comment-title text-align-center">
          <h3>Leave a comment!</h3>
        </div>
        <div>
          <CommentForm />
        </div>
      </>
    );
  }
}

// Container
// -- Accordion
// -- -- CommentCards
