import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import PicCarousel from './PicCarousel';
import TopBar from './TopBar';


class App extends Component {
  render() {
    return (
          <div className="AppContainer">

          <div className="topbar">
          <TopBar></TopBar>
          </div>
      
          <div className="carousel">
            <PicCarousel></PicCarousel>
          </div>

        </div>
      
    );
  }
}

export default App;
