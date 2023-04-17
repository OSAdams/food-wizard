import React from 'react';

export default class CommentCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userComments: null
    };
  }

  render() {
    const {
      props: {
        username,
        date,
        content
      }
    } = this;
    return (
      <div className="comment-card">
        <div className="comment-header flex f-justify-content-space-around" style={{ width: '50%' }}>
          <div className="comment-user">
            <p>{ username }</p>
          </div>
          <div className="comment-date">
            <p>{ date }</p>
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
}
