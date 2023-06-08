

// imports
import React, { useState } from 'react';
import { Route, Switch } from 'react-router-dom';
import Nav from '../Nav/Nav';
import Home from '../Home/Home';
import Search from '../Search/Search';
import Birdsongs from '../Birdsongs/Birdsongs';
import Error from '../Error/Error';
import magpie from '../../assets/birdsongs-magpie.png';
import './App.css';

// component 
const App = () => {
  let [url, setURL] = useState("");
  let [location, setLocation] = useState("");
  // let [toggle, setToggle] = useState(false);

  const handleSearch = (location, query) => {
    let urlString = `https://xeno-canto.org/api/2/recordings?query=loc:${location}+${query.toLowerCase()}`
    setURL(urlString);
    setLocation(location);
    // setToggle(true);
    }

  return (
    <div className="App">
      <Nav />
        <div className="background-container">
          <div className="arc">
          <Switch>
            <Route exact path="/" render={() => <Home />} />
            <Route exact path="/search" render={() => <Search handleSearch={handleSearch}/>} />
            <Route exact path="/results" render={() => <Birdsongs url={url} location={location}/>} />
            <Route exact path="*" render={() => <Error type={"redirect"}/>} />
          </Switch>
          </div>
          <img className="magpie" src={magpie}></img>
        </div>
    </div>
  );
};

export default App;

// proptypes