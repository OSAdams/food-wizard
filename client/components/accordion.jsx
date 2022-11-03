import React from 'react';
import ListGenerator from './list-generator';

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
    // eslint-disable-next-line
    const { verifyID, isLoading } = this.state;
    if (isLoading) {
      return <h4>Loading...</h4>;
    }
    const { data } = this.props;
    // eslint-disable-next-line
    console.log('accordion props data:', data);
    const renderData = data.map(index => {
      return (
        <div key={ index.number }>
          <div className="ac-title" onClick={() => this.handleClick(index.id)}>
            <h4>{ index.name }</h4>
          </div>
          <div className="ac-content">
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
