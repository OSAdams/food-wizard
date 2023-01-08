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
    // eslint-disable-next-line
    console.log(event.target.textContent);
    const textHash = event.target.textContent.toLowerCase();
    window.location.hash = textHash;
  }

  render() {
    const elementClass = 'menu-li-block';
    const menuOptions = [
      { number: '30003333', value: 'Home', className: elementClass },
      { number: '30002222', value: 'Search', className: elementClass },
      { number: '30001111', value: 'Favorites', className: elementClass },
      { number: '30004444', value: 'Account', className: elementClass }
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
