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
      verifyID: null,
      windowWidth: 0
    };
    this.handleResize = this.handleResize.bind(this);
  }

  handleClick(id) {
    const targetID = id;
    const { verifyID } = this.state;
    verifyID === targetID
      ? this.setState({ verifyID: null })
      : this.setState({ verifyID: targetID });
  }

  handleResize() {
    this.setState({ windowWidth: window.innerWidth });
  }

  componentDidMount() {
    this.handleResize();
    window.addEventListener('resize', this.handleResize);
  }

  render() {
    const { verifyID, windowWidth } = this.state;
    const recipeInstructions = this.props.data;
    const renderData = recipeInstructions.map(index => {
      return (
        <div key={ index.number }>
          <div className="ac-title font-light-2" onClick={() => this.handleClick(index.number)}>
            <h4>{index.name}</h4>
            <p>
              { index.number === verifyID ? <i className="fa-solid fa-arrow-up" /> : <i className="fa-solid fa-arrow-down" /> }</p>
          </div>
          {
          index.number === verifyID &&
            <ContentList content={ index.value } />
           }
        </div>
      );
    });
    const renderDataWide = recipeInstructions.map(index => {
      return (
        <div key={ index.number }>
          <div className="ac-title font-light-2" onClick={() => this.handleClick(index.number)}>
            <p>{index.name}</p>
            <p>
              <i className="fa-solid fa-arrow-down"/>
            </p>
          </div>
          <ContentList content={index.value} />
        </div>
      );
    });
    return windowWidth < 700 ? renderData : renderDataWide;
  }
}
