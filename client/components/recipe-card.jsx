import React from 'react';

export default function RecipeCard(props) {
  // eslint-disable-next-line
  const ratingLimit = 5;
  // eslint-disable-next-line
  const ratingNumber = props.rating;
  return (
    <div className="recipe-card flex fd-column ai-center">
      <div className="t-ct ht-200">
        <div className="flex jc-center ht-100">
          <h2 className="mg-top-0 text-center wd-260">{ props.title }</h2>
        </div>
        <div className="rc-list">
          <ul className="li-no-style">
            <li><p className="semi-bold clr-2nd-drk">calories: { props.calories }</p></li>
            <li><p className="semi-bold clr-2nd-drk">time: { props.time } minutes</p></li>
            <li><p className="semi-bold clr-2nd-drk">cuisine: { props.cuisine }</p></li>
          </ul>
        </div>
      </div>
      <div className="img-ct flex ai-end jc-center ht-200 wd-375" style={{
        backgroundImage: 'url("https://media2.wnyc.org/i/620/372/l/80/photologue/photos/wizard_feature_BIG.jpg")'
      }}>
        <div className="rc-rating">
          {
            // for(let i = 1, i < 5, i++) {
            //   <Rating rating="3" />
            // }
          /* {<i className="fa-solid fa-star" />
          <i className="fa-solid fa-star" />
          <i className="fa-solid fa-star" />
          <i className="fa-regular fa-star" />
          <i className="fa-regular fa-star" />} */}
        </div>
      </div>
    </div>
  );
}
