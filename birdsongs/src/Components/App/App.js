

// file imports
import './App.css';
import magpie from '../../assets/birdsongs-magpie.png';

// component imports 
import React, { useEffect, useState } from 'react';
import { Route, Switch } from 'react-router-dom';
import Nav from '../Nav/Nav';
import Home from '../Home/Home';
import Search from '../Search/Search';
import Birdsongs from '../Birdsongs/Birdsongs';
import Error from '../Error/Error';

// component 
const App = () => {
  var [location, setLocation] = useState("");
  var [query, setQuery] = useState("");

  const handleSearch = (location, query) => {
    console.log("inside", location, query);
    setLocation(location);
    setQuery(query);
  }

  return (
    <div className="App">
      <Nav />
        <div className="background-container">
          <div className="arc">
          <Switch>
            <Route exact path="/" render={() => <Home />} />
            <Route exact path="/search" render={() => <Search handleSearch={handleSearch}/>} />
            <Route exact path="/results" render={() => <Birdsongs location={location} query={query}/>} />
            <Route exact path="*" render={() => <Error />} />
          </Switch>
          </div>
          <img className="magpie" src={magpie}></img>
        </div>
    </div>
  );
};

export default App;

// proptypes