import React from './react';
import ListGenerator from './list-generator';

export default function MenuModal(props) {
  const menuOptions = [
    { number: '30003333', value: 'Home' },
    { number: '30002222', value: 'Search' },
    { number: '30001111', value: 'Favorites' },
    { number: '30004444', value: 'Account' },
    { number: '30005555', value: 'Close' }
  ];
  return (
    <div className="menu-modal">
      <ul className="menu-options">
        <ListGenerator content={menuOptions} />
      </ul>
    </div>
  );
}
