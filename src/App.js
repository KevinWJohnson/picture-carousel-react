import React, { Component } from 'react';
//import logo from './logo.svg';
import './App.css';

import PicCarousel from './PicCarousel';
import TopBar from './TopBar';
import PlayPauseBtns from './PlayPauseBtns';
import CreateEditDeleteBtns from './CreateEditDeleteBtns';
import { PicGrp1 } from './picturesGroup1.js';



class App extends Component {

  state = {
    intervalValue: 3000,
    slides: [],
    currentIndex: 0,
  };

  componentDidMount() {
    this.setState({slides: PicGrp1});
  }

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
    this.handleCarouselPause();
    this.handleCarouselCurrentIndex();
    const deleteSlideId = this.getSlideId();
    this.deleteSlide(deleteSlideId);
    // Adjusting current slide index if the slide deleted is the last slide.
    if (this.isFirstSlide()) {
      this.setState({currentIndex: 0});
    } else {
      this.setState({currentIndex: this.state.currentIndex - 1});
    }
    
  };

  handleCarouselCurrentIndex = (currentSlideIndex) => { 
    this.setState({currentIndex: currentSlideIndex});
    
  };

  getSlideId = () => {
    this.handleCarouselPause();
    this.handleCarouselCurrentIndex();
    let currentId = 0;
    for (let i = 0; i < this.state.slides.length; i++) {
        if (this.state.currentIndex === i) {
          currentId = this.state.slides[i].id;
        break;
        }
    }
    return currentId;
    
  };

  isLastSlide = () => {
    this.handleCarouselPause();
    this.handleCarouselCurrentIndex();
      if (this.state.currentIndex === this.state.slides.length - 1) {
        return true;
      } else {
        return false;
      }
  };

  isFirstSlide = () => {
    this.handleCarouselPause();
    this.handleCarouselCurrentIndex();
      if (this.state.currentIndex === 0) {
        return true;
      } else {
        return false;
      }
  };

  deleteSlide = (slideId) => {
    this.setState ({
      slides: this.state.slides.filter(s => s.id !== slideId),
    });
  }

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
            handleCurrentIndex={this.handleCarouselCurrentIndex}
            currentIndex={this.state.currentIndex}
            currentSlides={this.state.slides}
            >

            </PicCarousel>
          </div>

        </div>
      
    );
  }
}

export default App;
