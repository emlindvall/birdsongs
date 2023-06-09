// imports
import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/birdsongs-logo.png';
import './Nav.css'

// component
const Nav = () => {
  return(
    <div className="nav-container">
      <Link to={"/"}><img className="logo" src={logo} alt="Birdsongs logo featuring a small songbird in profile"></img></Link>
      <Link to={"/saved"}><button className="saved-button" id="saved-button">SAVED SONGS</button></Link>
    </div>
  )
}

export default Nav;