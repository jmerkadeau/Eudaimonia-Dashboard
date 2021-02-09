import React from 'react';
import { Link } from 'react-router-dom';
import './Nav.css';

function Nav() {
  return (
    <div className='nav'>
      <nav className='navbar'>
        <div className='navContent'>
          <Link className='navLink' to='/'>
            Profile
          </Link>
          <Link className='navLink' to='/mood' >
            Mood
          </Link>
        </div>
      </nav>
    </div>
  )
}

export default Nav;