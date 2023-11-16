import React from 'react';

export default function DeleteCommentModal(props) {
  const { props: { commentId, recipeId } } = this; // eslint-disable-line
  return (
    <div className="delete-modal-background pos-absolute">
      <div className="delete-modal">
        <div className="delete-modal-warning text-align-center">
          <p>
            Warning: Are you sure you want to delete your comment? This action is irreversible.
          </p>
        </div>
        <div className="flex f-justify-content-center f-align-items-center auth-signout">
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
