import React, { Component } from 'react';
//import logo from './logo.svg';
import './App.css';

import { PicGrp1 } from './picturesGroup1.js';
import uuid from 'uuid';
import PicCarousel from './PicCarousel';
import TopBar from './TopBar';
import PlayPauseBtns from './PlayPauseBtns';
import CreateEditDeleteBtns from './CreateEditDeleteBtns';
import FieldForm from './FieldForm';
import Client from './Client';




class App extends Component {

  state = {
    intervalValue: 3000,
    slides: [],
    currentIndex: 0,
    fields: {
      title: '',
      author: '',
      period: '',
      id: '',
      imageUrl: '',
      rotate: '',
      width: '',
      height: '',
    },
    fieldErrors: {},
  };

  componentDidMount() {
    this.loadSlidesFromServer();
    setInterval(this.loadSlidesFromServer, 5000);
  }

  loadSlidesFromServer = () => {
    Client.getSlides((serverSlides) => (
      this.setState({ slides: serverSlides })
      )
    );
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
  };

  handleCreateFormSubmit = (slide) => {
    //slide.preventDefault();
    this.createSlide(slide);
    console.log("In handleCreateFormSubmit");
    
  };

  validate = () => {
    const slide = this.state.fields;
    const fieldErrors = this.state.fieldErrors;
    const errMessages = Object.keys(fieldErrors).filter(k => fieldErrors[k]);

    if (!slide.title) return true;
    if (!slide.author) return true;
    if (!slide.period) return true;
    if (!slide.imageUrl) return true;
    if (!slide.rotate) return true;
    if (!slide.width) return true;
    if (!slide.height) return true;
    if (errMessages.length) return true;

    return false;
  };

  newSlide = (attrs = {}) => {
    const slide = {
      title: attrs.title || 'Title',
      author: attrs.author || 'Author',
      period: attrs.period || 'Period',
      id: uuid.v4(),
      imageUrl: attrs.imageUrl || 'ImageUrl',
      rotate: attrs.rotate || 'Rotate',
      width: attrs.width || 'Width',
      height: attrs.height || 'Height',
    };

    return slide;
  };

  createSlide = (slide) => {

    if (this.validate()) return;

    const ns = this.newSlide(slide);
    // console.log(this.state.slides);
    // console.log('ns: ', ns);
    this.setState({
      slides: this.state.slides.concat(ns),
      fields: {
        title: '',
        author: '',
        period: '',
        imageUrl: '',
        rotate: '',
        width: '',
        height: '',
      }
    });
    
    // const test = this.state.slides.concat(ns);
    // const str2 = JSON.stringify(test, null, 4);
    // console.log(str2);
  };
    

  onInputChange = ({name, value, error}) => {
    const fields = Object.assign({}, this.state.fields);
    const fieldErrors = Object.assign({}, this.state.fieldErrors);

    fields[name] = value;
    fieldErrors[name] = error;

    this.setState({fields, fieldErrors});
    //console.log(this.state.fields);
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
            handleCurrentIndex={this.handleCarouselCurrentIndex}
            currentIndex={this.state.currentIndex}
            currentSlides={this.state.slides}
            >

            </PicCarousel>
          </div>

          <div className="inputForm">
            <FieldForm
            onSubmit={this.handleCreateFormSubmit}
            onChange={this.onInputChange}
            fields={this.state.fields}
            slides={this.state.slides}
            validate={this.validate}
            >

            </FieldForm>
          </div>

        </div>
      
    );
  }
}

export default App;
