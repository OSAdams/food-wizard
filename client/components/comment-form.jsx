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
          path,
          params
        }
      },
      clearForm
    } = this;
    const isEditing = params.get('isEditing');
    const spoonId = params.get('recipeId');
    if (isEditing !== 'null') {
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
        .catch(err => console.error({ error: err }));
      window.location.hash = `${path}?recipeId=${spoonId}&newComment=true&isEditing=null`;
      clearForm();
    } else {
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
        .catch(err => console.error({ error: err }));
      window.location.hash = `${path}?recipeId=${spoonId}&newComment=true&isEditing=null`;
      clearForm();
    }
  }

  clearForm() {
    this.setState({ comment: '' });
    const { context: { route: { path, params } } } = this;
    const recipeId = params.get('recipeId');
    window.location.hash = `${path}?recipeId=${recipeId}&newComment=null&isEditing=null`;
  }

  componentDidMount() {
    const token = window.localStorage.getItem('food-wizard-jwt');
    const { route: { params } } = this.context;
    const newComment = params.get('newComment');
    this.setState({ token, newComment });
  }

  render() {
    const {
      context: {
        route: {
          params
        }
      },
      handleChange,
      handleSubmit,
      clearForm
    } = this;
    const isEditing = params.get('isEditing');
    const newComment = params.get('newComment');
    return (
      <form className="comment-form" onSubmit={ handleSubmit }>
        <div className="comment-value flex f-dir-col">
          <label htmlFor="comment">
            Type your comment:
          </label>
          <textarea
              required
              autoFocus
              id="comment"
              type="text"
              name="comment"
              onChange={ handleChange }>
            { isEditing !== 'null' ? `${newComment}` : '' }
          </textarea>
        </div>
        <div className="comment-buttons flex f-justify-content-space-around">
          <div>
            <button type="reset" className="clear-comment" onClick={ clearForm }>
              Delete Comment
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
