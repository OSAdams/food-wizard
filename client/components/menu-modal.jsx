import React from 'react';
import ListGenerator from './list-generator';
import AppContext from '../lib/app-context';

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
    } else if (textHash === 'sign in') {
      window.location.hash = '#sign-in';
    } else if (textHash === 'sign out') {
      window.location.hash = '#sign-out';
    } else {
      window.location.hash = textHash;
    }
  }

  render() {
    const elementClass = 'menu-li-block flex f-justify-content-center f-align-items-center';
    const { user } = this.context;
    const menuOptions = [
      { number: '30003333', value: 'Home', className: elementClass },
      { number: '30002222', value: 'Search', className: elementClass },
      { number: '30001111', value: 'Favorites', className: elementClass },
      { number: '30004444', value: 'Sign Up', className: elementClass },
      { number: '30005555', value: 'Sign In', className: elementClass }
    ];
    const authMenuOptions = [
      { number: '30003333', value: 'Home', className: elementClass },
      { number: '30002222', value: 'Search', className: elementClass },
      { number: '30001111', value: 'Favorites', className: elementClass },
      { number: '30004444', value: 'Sign Out', className: elementClass }
    ];
    return (
      <div className="menu-modal">
        <ul className="menu-options list-style-none">
          { !user
            ? <ListGenerator helperMethod={this.updateWindowHash} content={menuOptions} />
            : <ListGenerator helperMethod={this.updateWindowHash} content={authMenuOptions} />
          }
        </ul>
      </div>
    );
  }
}

MenuModal.contextType = AppContext;
