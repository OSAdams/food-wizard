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
    console.log('get req result:', this.state.recipes.results);
    if (this.state.recipes.length < 1) {
      return <h1>WhAt&apos;S gOiNg On HeRe</h1>;
    }
    const recipeTitles = this.state.recipes.results.map(index => {
      return <h3 key={ index.id }>{ index.title }</h3>;
    });
    return (
      <div>
        { recipeTitles }
      </div>
    );
  }
}
