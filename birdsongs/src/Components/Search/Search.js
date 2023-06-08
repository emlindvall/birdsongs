// imports 
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Dropdown from 'react-dropdown';
import dropdownOptions from '../../dropdownOptions.js';
import 'react-dropdown/customstyles.css';
import './Search.css';

// component
const Search = ({ handleSearch } ) => {
  const [location, setLocation] = useState("");
  const [query, setQuery] = useState("");

    return(
      <form className="search-container">
        <h3 className="search-header">Search birdsongs</h3>
        <label className="search-description">Start by selecting your state from the drop-down menu.</label>
        <Dropdown 
          className="location-field" 
          name="location-field" 
          placeholder="Select an option"
          options={dropdownOptions} 
          value={location} 
          onChange={(event) => setLocation(event.value)} 
          />
        <label className="search-description">Want to hear a specific bird? Try narrowing down your local results by typing its name below. You can leave this blank if you'd prefer a broader search.</label>
        <input 
          className="query-field" 
          name="query-field" 
          placeholder="Buff-bellied pipit"
          type="text" 
          value={query}
          onChange={(event) => setQuery(event.target.value)}>
        </input>
        {location && (
          <Link to={"/results"}><button className="button" onClick={() => handleSearch(location, query)}>SEARCH</button></Link>
        )}
      </form>
    )
}

export default Search;

// proptypes