import React from 'react';

export default class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      recipes: []
    };
  }

  /*
    IMPORTANT!!

    Bug: Using the search feature on the nav bar will not update the value
    of this.props.keyword and will send the fetch recall using the initial
    value used to search.

    If you search italian, the get req will return an array of 10 recipes with
    they keyword 'italian'. If you decide to search again using a different value,
    such as 'meatball', the fetch req still uses the value 'italian'

    if the pace is reloaded, the value of this.props.keyword is updated and the
    correct get req is sent. The return array will have recipes related to the 'meatball'
    keyword

    12/12/2022

    WIP
  */

  componentDidMount() {
    // eslint-disable-next-line
    const keyword = this.props.keyword;
    fetch(`https://api.spoonacular.com/recipes/complexSearch?query=${keyword}&apiKey=${process.env.SPOONACULAR_API_KEY}&number=10`)
      .then(res => res.json())
      .then(recipes => this.setState({ recipes }))
      .catch(err => console.error({ error: err }));
  }

  render() {
    // eslint-disable-next-line no-console
    console.log('search props:', this.props.keyword);
    // eslint-disable-next-line no-console
    console.log('get req result:', this.state.recipes);
    return <h1>WhAt&apos;S gOiNg On HeRe</h1>;
  }
}
