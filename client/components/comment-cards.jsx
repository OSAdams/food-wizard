import React from 'react';
import LoadingModal from './loading-modal';
import AppContext from '../lib/app-context';
import DeleteCommentModal from './delete-comment-modal'; // eslint-disable-line

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

  updateTimestamp(createdAt) {
    const dateTime = createdAt.split('T');
    const date = dateTime[0].slice(5);
    const time = dateTime[1].slice(0, 5);
    return `${date} ${time}`;
  }

  showDeleteModal() {
    this.setState({ showModal: true });
    console.log('comment-card line 34, showDeleteModal method definition'); // eslint-disable-line
  }

  /*
    Re-imagine how to show and hide the delete modal. You're going to have to update the state in this component. Maybe.
    What other component can you add it to? Clicking the delete icon is showing the modal so I need
    to be able to control the visibility of the modal in this component.

    Re-asses 11-12-23
  */
  render() {
    if (!this.state.userComments || !this.context.user) {
      return <LoadingModal />;
    }
    console.log('render state value: ', this.state.showModal); // eslint-disable-line
    const {
      state: {
        userComments,
        showModal
      },
      context: {
        user: {
          username
        },
        route: {
          path,
          params
        }
      },
      props: {
        recipeId,
        spoonApiId
      },
      updateTimestamp,
      showDeleteModal
    } = this;
    const controlsRender = (name, id, comment) => {
      const newComment = comment.toString();
      if (username === name) {
        return (
          <div>
            { showModal && <DeleteCommentModal recipeId={ recipeId } spoonApiId={ spoonApiId } commentId={ id } path={ path } params={ params.toString() } /> }
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
                onClick={ showDeleteModal }
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
            {/*
              Reading through the code, this may be where you need to impliment this feature.
              The entirety of this component smells like a bug. Tread litely.
            */}
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
