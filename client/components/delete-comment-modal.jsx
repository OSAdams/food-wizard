import React from 'react';

export default function DeleteCommentModal(props) {
  const { commentId, recipeId } = props; // eslint-disable-line
  return (
    <div className="delete-modal-background pos-absolute flex f-align-items-center">
      <div className="delete-modal margin-auto flex f-dir-col f-justify-content-center">
        <div className="delete-modal-warning text-align-center">
          <h3>
            Warning: Are you sure you want to delete your comment? This action is irreversible.
          </h3>
        </div>
        <div className="flex f-justify-content-center delete-modal-buttons">
          <button className="delete-modal-cancel">
            Oops, take me back!
          </button>
          <button className="delete-modal-confirm">
            Delete!
          </button>
        </div>
      </div>
    </div>
  );
}
