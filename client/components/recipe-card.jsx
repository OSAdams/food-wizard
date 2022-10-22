import React from 'react';

export default class RecipeCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      placeholder: null
    };
  }

  render() {
    return (
      <div className="recipe-card flex fd-column ai-center">
        <div className="t-ct ht-200">
          <div className="flex jc-center ht-100">
            <h2 className="mg-top-0 text-center wd-260">{ this.props.title }</h2>
          </div>
          <div className="rc-list">
            <ul className="li-no-style">
              <li><p className="semi-bold clr-2nd-drk">calories: { this.props.calories }</p></li>
              <li><p className="semi-bold clr-2nd-drk">time: { this.props.time } minutes</p></li>
              <li><p className="semi-bold clr-2nd-drk">cuisine: { this.props.cuisine }</p></li>
            </ul>
          </div>
        </div>
        <div className="img-ct flex ai-end jc-center ht-200 wd-375" style={{
          backgroundImage: 'url("https://media2.wnyc.org/i/620/372/l/80/photologue/photos/wizard_feature_BIG.jpg")'
        }}>
          <div className="rc-rating">
            <h2>placeholder</h2>
          </div>
        </div>
      </div>
    );
  }
}
