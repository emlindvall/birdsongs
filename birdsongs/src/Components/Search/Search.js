// imports 
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Dropdown from 'react-dropdown';
import dropdownOptions from '../../dropdownOptions.js';
import 'react-dropdown/style.css';
import './Search.css';

// component
const Search = ({ handleSearch } ) => {
  const [location, setLocation] = useState("");
  const [query, setQuery] = useState("");

    return(
      <form className="search-container">
        <h3 className="search-header">Search birdsongs</h3>
        <label className="search-description">Start by selecting a state to explore from the menu below.</label>
        <Dropdown 
          className="location-field" 
          name="location-field" 
          options={dropdownOptions} 
          value={location} 
          onChange={(event) => setLocation(event.value)} 
          />
        <label className="search-description">Looking for a specific bird?<br></br> Try narrowing down your results by common name. If you'd prefer a broader search, you can leave this field blank.</label>
        <input 
          className="query-field" 
          name="query-field" 
          placeholder="Common name"
          type="text" 
          value={query}
          onChange={(event) => setQuery(event.target.value)}>
        </input>
        {location && (
          <Link to={"/results"}><button className="button" id="search-button" onClick={() => handleSearch(location, query)}>SEARCH</button></Link>
        )}
      </form>
    )
}

export default Search;

// proptypes
Search.propTypes = {
  handleSearch: PropTypes.func.isRequired
}