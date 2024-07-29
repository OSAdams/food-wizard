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
    const { params } = this.context.route;
    if (textHash === 'sign up') {
      params.set('showMenu', 'false');
      window.location.hash = `sign-up?${params.toString()}`;
    } else if (textHash === 'sign in') {
      params.set('showMenu', 'false');
      window.location.hash = `sign-in?${params.toString()}`;
    } else if (textHash === 'sign out') {
      params.set('showMenu', 'false');
      window.location.hash = `sign-out?${params.toString()}`;
    } else {
      params.set('showMenu', 'false');
      window.location.hash = `${textHash}?${params.toString()}`;
    }
  }

  render() {
    const elementClass = 'menu-li-block';
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
