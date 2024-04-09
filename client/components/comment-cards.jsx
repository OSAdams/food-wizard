import React from 'react';
import LoadingModal from './loading-modal';
import AppContext from '../lib/app-context';
import DeleteCommentModal from './delete-comment-modal';

export default class CommentCards extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userComments: null,
      showModal: false
    };
    this.showDeleteModal = this.showDeleteModal.bind(this);
  }

  componentDidMount() {
    const { recipeId } = this.props;
    if (!recipeId) return 'Invalid parameter set, please use local recipe ID';
    fetch(`/api/comments/recipeId/${recipeId}`)
      .then(res => res.json())
      .then(comments => this.setState({ userComments: comments }))
      .catch(err => console.error({ error: err }));
  }

  updateTimeStamp(createdAt) {
    const dateTime = createdAt.split('T');
    const date = dateTime[0].slice(5);
    const time = dateTime[1].slice(0, 5);
    return `${date} ${time}`;
  }

  showDeleteModal() {
    this.setState({ showModal: true });
  }

  render() {
    if (!this.state.userComments) {
      return <LoadingModal />;
    }
    const {
      state: {
        userComments,
        showModal
      },
      context: {
        route: {
          path,
          params
        }
      },
      props: {
        spoonApiId
      },
      updateTimeStamp,
      showDeleteModal
    } = this;
    const controlsRender = (name, id, comment) => {
      const newComment = comment.toString();
      if (!this.context.user.username) return <div />;
      if (this.context.user.username === name) {
        return (
          <div>
            {showModal && <DeleteCommentModal commentId={ id } spoonApiId={ spoonApiId } />}
            <p>
              <i className="fa-solid fa-file-pen fa-lg pad-l-r-1rem"
                 onClick={ () => {
                   params.set('isEditing', id);
                   params.set('newComment', newComment);
                   window.location.hash = `${path}?${params.toString()}`;
                 }
                 }
              />
              <i className="fa-solid fa-trash fa-lg pad-l-r-1rem"
                onClick={ showDeleteModal }
              />
            </p>
          </div>
        );
      }
    };
    const commentsMap = userComments.map(commentIndex => {
      const { commentId, username, date, comment, deleted } = commentIndex;
      return (
        <div className="comment-card" key={ commentId }>
          <div className="comment-header flex f-justify-content-space-around">
            <div className="comment-user">
              <p>{ username }</p>
            </div>
            <div className="comment-date">
              <p>{ updateTimeStamp(date) }</p>
            </div>
            <div />
            { controlsRender(username, commentId, comment) }
          </div>
          <div className="comment-body">
            <div className="comment-content">
              <p>{ deleted === true ? 'Comment has been deleted by user.' : comment }</p>
            </div>
          </div>
        </div>
      );
    });
    return !userComments.length ? <div><p>Be the first to comment!</p></div> : commentsMap;
  }
}

CommentCards.contextType = AppContext;
