import React from 'react';
import LoadingModal from './loading-modal';
import AppContext from '../lib/app-context';
import DeleteCommentModal from './delete-comment-modal'; // eslint-disable-line

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
    fetch(`/api/comments/recipeId/${recipeId}`)
      .then(res => res.json())
      .then(comments => this.setState({ userComments: comments }))
      .catch(err => console.error({ error: err }));
  }

  updateTimestamp(createdAt) {
    const dateTime = createdAt.split('T');
    const date = dateTime[0].slice(5);
    const time = dateTime[1].slice(0, 5);
    return `${date} ${time}`;
  }

  render() {
    if (!this.state.userComments || !this.context.user) {
      return <LoadingModal />;
    }
    const {
      state: {
        userComments
      },
      context: {
        user: {
          username
        },
        route: {
          path
        }
      },
      updateTimestamp
    } = this;
    const controlsRender = (name, id, comment) => {
      const newComment = comment.toString();
      if (username === name) {
        return (
          <div>
            <p>
              <i className="fa-solid fa-file-pen fa-lg pad-l-r-1rem"
                 onClick={ () => {
                   const { params } = this.context.route;
                   params.set('isEditing', id);
                   params.set('newComment', newComment);
                   window.location.hash = `${path}?${params.toString()}`;
                 }
                 }
              />
              <i className="fa-solid fa-trash fa-lg pad-l-r-1rem"
                onClick={ () => {
                  console.log('haha'); // eslint-disable-line
                  /* Open modal, modal will send patch and update hash to update
                  component render */
                }
                }
              />
            </p>
          </div>
        );
      }
      return <div />;
    };
    const commentsMap = userComments.map(commentIndex => {
      const { commentId, username, date, comment } = commentIndex;
      return (
        <div className="comment-card" key={ commentId }>
          <div className="comment-header flex f-justify-content-space-around">
            <div className="comment-user">
              <p>{ username }</p>
            </div>
            <div className="comment-date">
              <p>{ updateTimestamp(date) }</p>
            </div>
            <div />
            { controlsRender(username, commentId, comment) }
          </div>
          <div className="comment-body">
            <div className="comment-content">
              <p>{ comment }</p>
            </div>
          </div>
        </div>
      );
    });
    return !userComments.length ? <div><p>Be the first to comment!</p></div> : commentsMap;
  }
}

CommentCards.contextType = AppContext;
