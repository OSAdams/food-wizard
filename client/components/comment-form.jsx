import React from 'react';

export default class CommentForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      comment: ''
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  render() {
    const { handleChange, state: { comment } } = this;
    console.log('comment: ', comment); // eslint-disable-line no-console
    return (
      <form className="comment-form">
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
              onChange={ handleChange } />
        </div>
        <div className="comment-buttons flex f-justify-content-space-around">
          <p>Delete Comment</p>
          <button type="submit" className="comment-button margin-auto">
            Submit
          </button>
        </div>
      </form>
    );
  }
}
