// imports
import React, { useState, useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import PropTypes from 'prop-types';
import Nav from '../Nav/Nav';
import Home from '../Home/Home';
import Search from '../Search/Search';
import Birdsongs from '../Birdsongs/Birdsongs';
import Birdsong from '../Birdsong/Birdsong';
import Saved from '../Saved/Saved';
import Error from '../Error/Error';
import getData from '../../ApiCall';
import magpie from '../../assets/birdsongs-magpie.png';
import './App.css';

// component 
const App = () => {
  let [location, setLocation] = useState("");
  let [recordings, setRecordings] = useState([]);
  let [recording, setRecording] = useState({});
  let [savedSongs] = useState([]);
  let [loading, setLoading] = useState(false);
  let [error, setError] = useState("");

  const clearInputs = () => {
    setRecordings([]);
    setLoading(true);
    setError("");
  }

  const handleSearch = async (location, query) => {
    clearInputs();
    let url = `https://xeno-canto.org/api/2/recordings?query=loc:${location}+${query}`;
    const data = await getData(url);
    if (data) {
      setRecordings(data.recordings.slice(0, 20));
      setLocation(location);
      setLoading(false);
    } else {
      setLoading(false);
    }
  }

  const handleSelect = async (id) => {
    clearInputs();
    let url = `https://xeno-canto.org/api/2/recordings?query=nr:${id}`;
    const data = await getData(url);
    setRecording(data.recordings[0]);
  }

  const handleFavorite = (recording) => {
    savedSongs.push(recording);
  }

  return (
    <div className="App">
      <Nav />
        <div className="background-container">
          <div className="arc">
          <Switch>
            <Route exact path="/" render={() => <Home />} />
            <Route exact path="/search" render={() => <Search handleSearch={handleSearch}/>} />
            <Route exact path="/results" render={() => <Birdsongs recordings={recordings} location={location} error={error} loading={loading} handleSelect={handleSelect}/>} />
            <Route exact path="/saved" render={() => <Saved savedSongs={savedSongs} handleSelect={handleSelect}/>} />
            <Route exact path="/:id" component={({ match }) => recording && Object.keys(recording).length ? (<Birdsong recording={recording} error={error} handleFavorite={handleFavorite} />) : (<Error type="redirect" />)} />
            <Route path="*" render={() => <Error type={"redirect"}/>} />
          </Switch>
          </div>
          <img className="magpie" src={magpie} alt="Vintage illustration of a black-billed magpie perched on a blooming prickly pear cactus"></img>
        </div>
    </div>
  );
};

export default App;

// proptypes
App.propTypes = {
  location: PropTypes.string,
  query: PropTypes.string, 
  url: PropTypes.string,
  data: PropTypes.object,
  recordings: PropTypes.array,
  recording: PropTypes.object,
  error: PropTypes.string,
  loading: PropTypes.bool
}