import React, { Component } from 'react';
import './App.css';
import Header from './components/Header';
import Home from './components/Home';
import Characters from './components/Characters';
import Locations from './components/Locations';
import Episodes from './components/Episodes';
import CharacterData from './components/CharacterData'
import EpisodeData from './components/EpisodeData'
import LocationData from './components/LocationData'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";


class App extends Component {
   render () {
    return (
      <Router>
        <div className="App">
          <Header></Header>
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/characters" component={Characters} />
            <Route path="/locations" component={Locations} />
            <Route path="/episodes" component={Episodes} /> 
            <Route path="/character/:id" children={<CharacterData />} />
            <Route path="/location/:id" children={<LocationData />} />
            <Route path="/episode/:id" children={<EpisodeData />} />
          </Switch> 
        </div>
      </Router>
      
    );
  }
  
}



export default App;
