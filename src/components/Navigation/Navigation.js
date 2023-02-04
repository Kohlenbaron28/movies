import React from 'react';

import './Navigation.css';

export default class Navigation extends React.Component {
  render() {
    return (
      <div>
        <ul className="navigation">
          <li className="navigation__item active">Search</li>
          <li className="navigation__item">Rated</li>
        </ul>
      </div>
    );
  }
}
