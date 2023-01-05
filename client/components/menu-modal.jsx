import React from 'react';
import ListGenerator from './list-generator';

export default function MenuModal(props) {
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
        <ListGenerator content={menuOptions} />
      </ul>
    </div>
  );
}

// Add event listener to ListGenerator to spy on children
// if value === X update the window hash
//  impliment error handling (improve over time)
//  if windowWidth < 700
//    showMenu: false
//    update window hash
//  update window hash
//
//
// prototype
// handleClick(event) {
//   console.log(event.target.value (or) event.target.textContent)
//
// }
//
// Update this function to a class react component
// Look into using props to pass a method
//
//
