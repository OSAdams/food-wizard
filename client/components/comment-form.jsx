import React from 'react';

export default class CommentForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      comment: ''
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
  }

  clearForm() {
    this.setState({ comment: '' });
  }

  render() {
    const {
      state: { comment },
      handleChange,
      handleSubmit,
      clearForm
    } = this;
    console.log('comment: ', comment); // eslint-disable-line no-console
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
            <p onClick={ clearForm }>Delete Comment</p>
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
