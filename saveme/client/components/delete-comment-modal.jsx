import React from 'react';
import AppContext from '../lib/app-context';

export default class DeleteCommentModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      token: ''
    };
    this.handleDelete = this.handleDelete.bind(this);
  }

  handleDelete() {
    const { state: { token }, context: { route: { path, params }, user: { userId, username } }, props: { spoonApiId, commentId } } = this;
    const reqBody = { username };
    const data = JSON.stringify(reqBody);
    fetch(`/api/comments/delete/commentId/${commentId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'X-Access-Token': token
      },
      user: userId,
      body: data
    })
      .then(() => {
        params.set('recipeId', spoonApiId);
        params.set('newComment', 'true');
        window.location.hash = `${path}?${params.toString()}`;
      })
      .catch(err => console.error({ error: err }));
  }

  componentDidMount() {
    const token = window.localStorage.getItem('food-wizard-jwt');
    this.setState({ token });
  }

  render() {
    const {
      props: {
        spoonApiId
      },
      context: {
        route: {
          path,
          params
        }
      },
      handleDelete
    } = this;
    return (
      <div className="delete-modal-background pos-absolute flex f-align-items-center">
        <div className="delete-modal margin-auto flex f-dir-col f-justify-content-center">
          <div className="delete-modal-warning text-align-center">
            <h2>Warning:</h2>
            <h3>
              Are you sure you want to delete your comment? This action is irreversible.
            </h3>
          </div>
          <div className="flex f-justify-content-center delete-modal-controls">
            <div className="margin-auto">
              <a className="delete-modal-cancel" onClick={ () => {
                params.set('recipeId', spoonApiId);
                params.set('newComment', 'true');
                window.location.hash = `${path}?${params.toString()}`;
              }
           }>
                Oops, take me back!
              </a>
            </div>
            <div>
              <button onClick={handleDelete}>
                Yes, delete!
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

DeleteCommentModal.contextType = AppContext;
