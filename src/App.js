import React, { Component } from 'react';
//import logo from './logo.svg';
import './App.css';

import PicCarousel from './PicCarousel';
import TopBar from './TopBar';
import PlayPauseBtns from './PlayPauseBtns';



class App extends Component {

  state = {
    intervalValue: 5000,
  };

  handleCarouselPlay = () => { 
    this.setState({intervalValue: 5000});
  };

  handleCarouselPause = () => { 
    this.setState({intervalValue: false});
  };

  render() {
    return (
          <div className="AppContainer">

          <div className="topbar">
          <TopBar></TopBar>
          </div>

          <div className="playpauseBtns">
          <PlayPauseBtns
          onPlay={this.handleCarouselPlay}
          onPause={this.handleCarouselPause}
          >
          </PlayPauseBtns>
          </div>
          
      
          <div className="carousel">
            <PicCarousel
            intervalSet={this.state.intervalValue}
            >

            </PicCarousel>
          </div>

        </div>
      
    );
  }
}

export default App;
