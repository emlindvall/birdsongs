// imports
import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

// component
const Home = () => {
  return (
    <article className="header-container">
      <p className="header-top">Do my ears deceive me, or was that a buff-bellied pipit?</p>
      <h1 className="header">BIRD SONGS</h1>
      <p className="header-bottom">How well do you know the vocalizations around you? Build your backyard birding skills with Birdsongs!</p>
      <Link to={"/search"}><button className="button">START</button></Link>
    </article>
  )
}

export default Home;

// proptypes