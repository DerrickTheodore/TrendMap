import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => (
  <header>
    <nav>
      <ul className="float-container nav">
        <li className="float-item tab nav-button trends-button"><Link to='/'>Trends</Link></li>
        <li className="float-item tab nav-button tweets-button"><Link to='/tweets'>Tweets</Link></li>
        <li className="float-item tab nav-button favorites-button"><Link to='/favorites'>Favorites</Link></li>
        <li className="auth-button"><Link to='/auth'>Login/Signup</Link></li>
      </ul>
    </nav>
  </header>
)

export default Header;