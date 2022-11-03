import React from 'react';
import ListGenerator from './list-generator';

function ContentList(props) {
  return (
    <div className="ac-content">
      <ol>
        <ListGenerator content={ props.content } />
      </ol>
    </div>
  );
}

export default class Accordion extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      verifyID: null
    };
  }

  componentDidMount() {
    this.setState({ isLoading: false });
  }

  handleClick(id) {
    const targetID = id;
    const { verifyID } = this.state;
    verifyID === targetID
      ? this.setState({ verifyID: null })
      : this.setState({ verifyID: targetID });
  }

  render() {
    const { verifyID, isLoading } = this.state;
    if (isLoading) {
      return <h4>Loading...</h4>;
    }
    const { data } = this.props;
    const renderData = data.map(index => {
      return (
        <div key={ index.number }>
          <div className="ac-title font-light-2" onClick={() => this.handleClick(index.number)}>
            <h4>{index.name} </h4>
            <p>
              { index.number === verifyID ? <i className="fa-solid fa-arrow-up" /> : <i className="fa-solid fa-arrow-down" /> }</p>
          </div>
          {
          index.number === verifyID
            ? <ContentList content={ index.value } />
            : null
           }
        </div>
      );
    });
    return renderData;
  }
}
