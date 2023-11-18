import React from 'react';
import AppContext from '../lib/app-context';

export default class DeleteCommentModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isCompleted: false
    };
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
      }
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
          <div className="flex f-justify-content-center delete-modal-buttons">
            <button className="delete-modal-cancel" onClick={ () => {
              params.set('recipeId', spoonApiId);
              params.set('newComment', 'true');
              window.location.hash = `${path}?${params.toString()}`;
            }
           }>
              Oops, take me back!
            </button>
            <button className="delete-modal-confirm">
              Yes, delete!
            </button>
          </div>
        </div>
      </div>
    );
  }
}

DeleteCommentModal.contextType = AppContext;
