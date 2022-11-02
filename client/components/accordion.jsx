import React from 'react';
import ListGenerator from './list-generator';

export default class Accordion extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      verifyID: null
    };
  }

  handleClick(id) {
    const targetID = id;
    const { verifyID } = this.state;
    verifyID === targetID
      ? this.setState({ verifyID: null })
      : this.setState({ verifyID: targetID });
  }

  render() {
    // eslint-disable-next-line
    const { verifyID } = this.state;
    const { data } = this.props;
    const renderData = data.map(index => {
      return (
        <div key={index.number}>
          <div className="ac-title" onClick={() => this.handleClick(index.id)}>
            <h4>{ index.name }</h4>
          </div>
          <div>
            <ol>
              <ListGenerator content={ index.value } />
            </ol>
          </div>
        </div>
      );
    });
    return renderData;
  }
}
