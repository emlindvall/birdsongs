import React from 'react';
import logo from '../../assets/birdsongs-logo.png';
import './Nav.css'


const Nav = () => {
  return(
    <div className="nav-container">
      <img className="logo" src={logo}></img>
      <button className="saved-button">SAVED SONGS</button>
    </div>
  )
}

export default Nav;