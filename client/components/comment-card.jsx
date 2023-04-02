import React from 'react';

export default function CommentCard(props) {
  const { header: { username, date }, content } = props;
  return (
    <div className="comment-card">
      <div className="comment-header">
        <div className="comment-user">
          <h4>{ username }</h4>
        </div>
        <div className="comment-date">
          <h5>{ date }</h5>
        </div>
      </div>
      <div className="comment-body">
        <div className="comment-content">
          { content }
        </div>
      </div>
    </div>
  );
}
