import React from 'react';
import LoadingModal from './loading-modal';
import AppContext from '../lib/app-context';

export default class CommentCards extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userComments: null
    };
    this.updateTimestamp = this.updateTimestamp.bind(this);
    this.userCommentControls = this.userCommentControls.bind(this);
  }

  componentDidMount() {
    const { recipeId } = this.props;
    if (!recipeId) return 'Invalid parameter set, please use local recipe ID';
    fetch(`/api/comments/${recipeId}`)
      .then(res => res.json())
      .then(comments => this.setState({ userComments: comments }))
      .catch(err => console.error({ error: err }));
  }

  updateTimestamp(createdAt) {
    const dateTime = createdAt.split('T');
    const date = dateTime[0];
    const time = dateTime[1].slice(0, 5);
    return `${date} ${time}`;
  }

  userCommentControls() {
    // eslint-disable-next-line
    console.log(this.context);
  }

  render() {
    if (!this.state.userComments) {
      return <LoadingModal />;
    }
    const {
      state: {
        userComments
      },
      context: {
        user: {
          username
        }
      },
      updateTimestamp,
      userCommentControls
    } = this;
    const controlsRender = string => {
      if (username === string) {
        return (
          <div>
            <p>
              <i className="fa-solid fa-file-pen fa-lg pad-l-r-1rem"
              onClick={userCommentControls}
            />
              <i className="fa-solid fa-trash fa-lg pad-l-r-1rem" />
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
            { controlsRender(username) }
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

CommentCards.contextType = AppContext;
