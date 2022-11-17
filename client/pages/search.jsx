import React from 'react';

export default class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      recipes: []
    };
  }

  componentDidMount() {
    // eslint-disable-next-line
    const keyWord = this.props.keyWord;
  }

  render() {
    return <h1>WhAt&apos;S gOiNg On HeRe</h1>;
  }
}
