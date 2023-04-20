import React from 'react';
import LoadingModal from './loading-modal';

export default class CommentCards extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userComments: null
    };
  }

  componentDidMount() {
    const { recipeId } = this.props;
    if (!recipeId) return 'Invalid parameter set, please use local recipe ID';
    fetch(`/api/comments/${recipeId}`)
      .then(res => res.json())
      .then(comments => this.setState({ userComments: comments }))
      .catch(err => console.error({ error: err }));
  }

  render() {
    if (!this.state.userComments) {
      return <LoadingModal />;
    }
    const {
      props: {
        recipeId
      },
      state: {
        userComments
      }
    } = this;
    console.log('recipeId: ', recipeId); // eslint-disable-line
    console.log('userComments: ', userComments); // eslint-disable-line
    const commentsMap = userComments.map(commentIndex => {
      const { commentId, userId, createdAt, comment } = commentIndex;
      return (
        <div className="comment-card" key={ commentId }>
          <div className="comment-header flex f-justify-content-space-around" style={{ width: '50%' }}>
            <div className="comment-user">
              <p>{ userId }</p>
            </div>
            <div className="comment-date">
              <p>{ createdAt }</p>
            </div>
          </div>
          <div className="comment-body">
            <div className="comment-content">
              <p>{ comment }</p>
            </div>
          </div>
        </div>
      );
    });
    return commentsMap;
  }
}
