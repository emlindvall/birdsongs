// imports
import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

// component
const Home = () => {
  return (
    <article className="header-container">
      <p className="header-top">The Birdcall Library</p>
      <h1 className="header">BIRD SONGS</h1>
      <p className="header-bottom">Do my ears deceive me, or was that a buff-bellied pipit?</p>
      <Link to={"/search"}><button className="button" id="start-button">START</button></Link>
    </article>
  )
}

export default Home;
