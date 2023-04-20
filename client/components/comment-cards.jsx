import React from 'react';
import LoadingModal from './loading-modal';

export default class CommentCards extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userComments: null
    };
  }

  componentDidMount() {
    const { props: recipeId } = this;
    if (!recipeId) return 'Invalid parameter set, please use local recipe ID';
    fetch(`/api/comments/${recipeId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => res.json())
      .then(comments => this.setState({ userComments: comments }))
      .catch(err => console.error({ error: err }));
  }

  render() {
    if (!this.state.userComments) {
      return <LoadingModal />;
    }
    const {
      props: {
        recipeId
      },
      state: {
        userComments
      }
    } = this;
    console.log('recipeId: ', recipeId); // eslint-disable-line
    console.log('userComments: ', userComments); // eslint-disable-line
    return (
      <div className="comment-card">
        <div className="comment-header flex f-justify-content-space-around" style={{ width: '50%' }}>
          <div className="comment-user">
            <p>John Smith</p>
          </div>
          <div className="comment-date">
            <p>4-20-23</p>
          </div>
        </div>
        <div className="comment-body">
          <div className="comment-content">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam eum corrupti veritatis laboriosam placeat? Pariatur sunt consequatur ducimus explicabo in odio iusto quod beatae nostrum esse. Ratione, numquam. Modi, laborum?
          </div>
        </div>
      </div>
    );
  }
}
