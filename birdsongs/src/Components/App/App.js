// imports
import React, { useState } from 'react';
import { Route, Switch } from 'react-router-dom';
import Nav from '../Nav/Nav';
import Home from '../Home/Home';
import Search from '../Search/Search';
import Birdsongs from '../Birdsongs/Birdsongs';
import Birdsong from '../Birdsong/Birdsong';
import Saved from '../Saved/Saved';
import Error from '../Error/Error';
import magpie from '../../assets/birdsongs-magpie.png';
import './App.css';

// component 
const App = () => {
  let [url, setURL] = useState("");
  let [location, setLocation] = useState("");
  let [recordingData, setRecordingData] = useState({});
  let [savedSongs] = useState([]);

  const handleSearch = (location, query) => {
    query = formatLocation(query);
    let urlString = `https://xeno-canto.org/api/2/recordings?query=loc:${location}+${query}`;
    setURL(urlString);
    setLocation(location);
    }

  const handleSelect = (recording) => {
    setRecordingData(recording);
  }

  const handleFavorite =  (recording) =>  {
    savedSongs.push(recording);
  }

  const formatLocation = (unformatted) =>  {
    if (unformatted)  {
      let formatted = `"${unformatted}"`
      return formatted;
    } else{
      return unformatted;
    }
  }

  return (
    <div className="App">
      <Nav />
        <div className="background-container">
          <div className="arc">
          <Switch>
            <Route exact path="/" render={() => <Home />} />
            <Route exact path="/search" render={() => <Search handleSearch={handleSearch}/>} />
            <Route exact path="/results" render={() => <Birdsongs url={url} location={location} handleSelect={handleSelect}/>} />
            <Route exact path="/saved" render={() => <Saved savedSongs={savedSongs}handleSelect={handleSelect}/>} /> 
            <Route exact path="/:id" render = {({ match }) => {return(<Birdsong id={match.params.id} handleFavorite={handleFavorite}/>)}} />
            <Route exact path="/*" render={() => <Error type={"redirect"}/>} />
          </Switch>
          </div>
          <img className="magpie" src={magpie} alt="Vintage illustration of a black-billed magpie perched on a blooming prickly pear cactus"></img>
        </div>
    </div>
  );
};

export default App;

// proptypes