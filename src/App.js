import React, { Component } from 'react';
//import logo from './logo.svg';
import './App.css';

import PicCarousel from './PicCarousel';
import TopBar from './TopBar';
import PlayPauseBtns from './PlayPauseBtns';
import CreateEditDeleteBtns from './CreateEditDeleteBtns';



class App extends Component {

  state = {
    intervalValue: 3000,
  };

  handleCarouselPlay = () => { 
    this.setState({intervalValue: 3000});
  };

  handleCarouselPause = () => { 
    this.setState({intervalValue: false});
  };

  handleCarouselCreate = () => { 
    
  };

  handleCarouselEdit = () => { 
    
  };

  handleCarouselDelete = () => { 
    
  };

  render() {
    return (
          <div className="AppContainer">

          <div className="topbar">
          <TopBar></TopBar>
          </div>

          <div className="BtnContainer">
            <div className="row">
              <div className="col">
                <div className="playPauseBtns">
                  <PlayPauseBtns
                  onPlay={this.handleCarouselPlay}
                  onPause={this.handleCarouselPause}
                  >
                  </PlayPauseBtns>
                </div>
              </div>
              <div className="col">
                <div className="createEditDeleteBtns">
                  <CreateEditDeleteBtns
                  onCreate={this.handleCarouselCreate}
                  onEdit={this.handleCarouselEdit}
                  onDelete={this.handleCarouselDelete}
                  >
                  </CreateEditDeleteBtns>
                </div>
              </div>
            </div>
          </div>
          <div className="clearFloat"></div>

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
