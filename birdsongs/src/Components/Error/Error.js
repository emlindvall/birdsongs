// imports
import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import './Error.css';

// component
const Error = ({ type }) => {
  if (type == "search")  {
    return(
      <div className="error-container">
        <h2 className="error-header">Oh no!</h2>
        <h3>Looks like you're on a wild goose chase. There are no results for that bird. Check for typos, or try broadening your search term.</h3>
        <p>Search tip: The Birdsongs search feature is best-equipped to handle English genera, and does not currently recognize Latin species names. Stay tuned!</p>
        <Link to={"/search"}><button className="button" id="back-button">BACK</button></Link>
      </div>
    )
  }

  if (type == "redirect") {
    return(
      <div className="error-container">
        <h2 className="error-header">Oh no!</h2>
        <p>Looks like you're on a wild goose chase. Check that URL and try again.</p>
        <Link to={"/"}><button className="button" id="home-button">HOME</button></Link>
      </div>
    )
  }

  if (type == "fetch") {
    return(
      <div className="error-container">
        <h2 className="error-header">Oh no!</h2>
        <p>Something's gone wrong on our end.</p>
        <Link to={"/"}><button className="button" id="home-button">HOME</button></Link>
      </div>
    )
  }
}

export default Error;

// proptypes
Error.propTypes = {
  type: PropTypes.string.isRequired
}