import React from 'react';

export default function CommentCard(props) {
  return (
    <div className="comment-card">
      <div className="comment-header">
        <div className="comment-user">
          <h4>Dummy Name</h4>
        </div>
        <div className="comment-date">
          <h5>01-33-70</h5>
        </div>
      </div>
      <div className="comment-body">
        <div className="comment-content">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Voluptatibus, deserunt animi! Nisi illo, perspiciatis labore cupiditate, ea eaque odit minus totam accusantium architecto est in reiciendis facilis temporibus quis dicta.
        </div>
      </div>
    </div>
  );
}
