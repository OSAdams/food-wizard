import React from 'react';
import ListGenerator from './list-generator';

export default class MenuModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      windowHash: false
    };
    this.updateWindowHash = this.updateWindowHash.bind(this);
  }

  updateWindowHash(event) {
    const textHash = event.target.textContent.toLowerCase();
    if (textHash === 'sign up') {
      window.location.hash = '#sign-up';
    } if (textHash === 'sign in') {
      window.location.hash = '#sign-in';
    } else {
      window.location.hash = textHash;
    }
  }

  // update this to handle if the user is signed in, or not by using the user
  // value from the app page. If null, use sign up or sign in. If not, use
  // log out
  //
  // Come back to this later.

  render() {
    const elementClass = 'menu-li-block flex f-justify-content-center f-align-items-center';
    const menuOptions = [
      { number: '30003333', value: 'Home', className: elementClass },
      { number: '30002222', value: 'Search', className: elementClass },
      { number: '30001111', value: 'Favorites', className: elementClass },
      { number: '30004444', value: 'Sign Up', className: elementClass },
      { number: '30005555', value: 'Sign In', className: elementClass }
    ];
    return (
      <div className="menu-modal">
        <ul className="menu-options">
          <ListGenerator helperMethod={ this.updateWindowHash } content={menuOptions} />
        </ul>
      </div>
    );
  }
}
