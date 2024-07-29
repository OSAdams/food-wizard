import React from 'react';
import AppContext from '../lib/app-context';

export default class CommentForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      comment: '',
      token: '',
      newComment: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.clearForm = this.clearForm.bind(this);
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  handleSubmit(e) {
    e.preventDefault();
    const {
      state: {
        comment,
        token
      },
      props: {
        recipeId
      },
      context: {
        user: {
          userId
        },
        route: {
          params
        }
      },
      clearForm
    } = this;
    const isEditing = params.get('isEditing');
    if (!isEditing || isEditing === 'null' || isEditing === 'false') {
      const reqBody = {
        comment
      };
      const data = JSON.stringify(reqBody);
      fetch(`/api/comments/post/recipeId/${recipeId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Access-Token': token
        },
        user: userId,
        body: data
      })
        .then(() => {
          clearForm();
        })
        .catch(err => console.error({ error: err }));
    } else {
      const commentId = params.get('isEditing');
      const reqBody = {
        comment
      };
      const data = JSON.stringify(reqBody);
      fetch(`/api/comments/edit/commentId/${commentId}`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            'X-Access-Token': token
          },
          user: userId,
          body: data
        })
        .then(() => {
          clearForm();
        })
        .catch(err => console.error({ error: err }));
    }
  }

  clearForm() {
    this.setState({ comment: '', newComment: 'null' });
    const { context: { route: { path, params } } } = this;
    params.delete('isEditing');
    const newComment = params.get('newComment');
    newComment !== 'true' ? params.set('newComment', 'true') : params.set('newComment', 'false');
    window.location.hash = `${path}?${params.toString()}`;
  }

  componentDidMount() {
    const token = window.localStorage.getItem('food-wizard-jwt');
    const { route: { params } } = this.context;
    const comment = params.get('newComment');
    const newComment = comment === 'null' || comment === 'true' || comment === 'false' ? '' : comment;
    this.setState({ token, newComment });
  }

  render() {
    const {
      state: {
        newComment
      },
      context: {
        user
      },
      handleChange,
      handleSubmit,
      clearForm
    } = this;
    if (!user || !user.username) {
      return <p>You must be logged in to comment!</p>;
    }
    return (
      <form className="comment-form" onSubmit={ handleSubmit }>
        <div className="comment-value flex f-dir-col">
          <label htmlFor="comment">
            <h3>Share your thoughts below!</h3>
          </label>
          <textarea
              required
              autoFocus
              id="comment"
              type="text"
              name="comment"
              defaultValue={ newComment }
              onChange={ handleChange } />
        </div>
        <div className="comment-buttons flex f-justify-content-space-around">
          <div>
            <button type="reset" className="clear-comment" onClick={ clearForm }>
              Clear Comment
            </button>
          </div>
          <div>
            <button type="submit" className="comment-button">
              Submit
            </button>
          </div>
        </div>
      </form>
    );
  }
}

CommentForm.contextType = AppContext;
