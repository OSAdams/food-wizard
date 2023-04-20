import React from 'react';
import AppContext from '../lib/app-context';

export default class CommentForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      comment: '',
      token: ''
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
        }
      },
      clearForm
    } = this;
    const reqBody = {
      recipeId,
      comment
    };
    const data = JSON.stringify(reqBody);
    fetch('/api/comments', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Access-Token': token
      },
      user: userId,
      body: data
    })
      .catch(err => console.error({ error: err }));
    clearForm();
  }

  clearForm() {
    this.setState({ comment: '' });
  }

  componentDidMount() {
    const token = window.localStorage.getItem('food-wizard-jwt');
    this.setState({ token });
  }

  render() {
    const {
      state: { comment },
      handleChange,
      handleSubmit,
      clearForm
    } = this;
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
              value={ comment }
              onChange={ handleChange } />
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
