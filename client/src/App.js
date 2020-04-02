import React, { Component } from 'react';
//import logo from './logo.svg';
import './App.css';

//import { PicGrp1 } from './picturesGroup1.js';
import uuid from 'uuid';
import PicCarousel from './PicCarousel';
import TopBar from './TopBar';
import PlayPauseBtns from './PlayPauseBtns';
import CreateEditDeleteBtns from './CreateEditDeleteBtns';
import CreateSlide from './CreateSlide';
import EditSlide from './EditSlide';
import Login from './Login';
import Logout from './Logout';
import Client from './Client';
import ClientAxios from './ClientAxios';
import { Route, Redirect, Switch, withRouter } from 'react-router-dom';
import FieldForm from './FieldForm';
import PrivateRoute from './PrivateRoute';



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
    editFormOpen: false,
    createFormOpen: false,
    cancelForm: false,
    selectedGroup: '',
    uniquePeriodsArray: [],
  };

  componentDidMount = () => {
    this.loadSlidesFromServer();
    setInterval(this.loadSlidesFromServer, 5000);
  }

  loadSlidesFromServer = () => {  
    ClientAxios.getSlides((serverSlides) => (
      this.setState({ slides: serverSlides.data }, () => {
        // const test = this.state.slides;
        // const str2 = JSON.stringify(test, null, 4);
        // console.log("Slides Loaded");
        // console.log(str2);
        const arrayPeriods = this.state.slides.map((slide) => {
          return slide.period;
        });
        const uniquePeriods = arrayPeriods.filter((v, i, a) => a.indexOf(v) === i);
        uniquePeriods.sort((a, b) => (
          parseInt(a) - parseInt(b)
        ));
        this.setState({uniquePeriodsArray: uniquePeriods});
      })
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
    //console.log("In handleCarouselCreate");
    this.setState( { createFormOpen: true } );
    this.setState( { cancelForm: false } );
    this.props.history.push('/carousel/admin/createSlide');
    
    
  };

  handleCarouselEdit = () => { 
    this.setState( { editFormOpen: true } );
    this.setState( { cancelForm: false } );
    this.props.history.push('/carousel/admin/editSlide');
    
    this.handleCarouselPause();
    
    const editSlideId = this.getSlideId();
    const curSlide = this.state.slides.find(
      (s) => s.id === editSlideId
    );

    this.setState({
      fields: {
        title: curSlide.title,
        author: curSlide.author,
        period: curSlide.period,
        id: curSlide.id,
        imageUrl: curSlide.imageUrl,
        rotate: curSlide.rotate,
        width: curSlide.width,
        height: curSlide.height,
      }
    });
    
  };

  handleCarouselDelete = () => {
    this.handleCarouselPause();
    const deleteSlideId = this.getSlideId();
    this.deleteSlide(deleteSlideId);
    // Adjusting current slide index if the slide deleted is the last slide.
    if (this.isFirstSlide()) {
      this.setState({currentIndex: 0});
    } else {
      this.setState((state) => {
        return {currentIndex: this.state.currentIndex - 1};
      });
    }
    
  };

  handleCarouselCurrentIndex = (currentSlideIndex) => { 
    this.setState({currentIndex: currentSlideIndex});
     
  };

  getSlideId = () => {
    this.handleCarouselPause();
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
      if (this.state.currentIndex === this.state.slides.length - 1) {
        return true;
      } else {
        return false;
      }
  };

  isFirstSlide = () => {
    this.handleCarouselPause();
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
    ClientAxios.deleteSlide( {id: slideId} );
  };

  handleCreateFormSubmit = (slide) => {
    //slide.preventDefault();
    this.createSlide(slide);
    //console.log("In handleCreateFormSubmit");
    this.setState( { createFormOpen: false } );
    
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
      id: attrs.id ? attrs.id : uuid.v4(),
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
        id: '',
        imageUrl: '',
        rotate: '',
        width: '',
        height: '',
      }
    });
    ClientAxios.createSlide(ns);
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


  handleCancelForm = () => {
    this.setState( { cancelForm: true } );

    this.setState({
      fields: {
        title: '',
        author: '',
        period: '',
        id: '',
        imageUrl: '',
        rotate: '',
        width: '',
        height: '',
      }
    });
  };

  editSlide = (attrs) => {
    this.setState({
      slides: this.state.slides.map((slide) => {
        if (slide.id === attrs.id) {
          return Object.assign({}, slide, {
            title: attrs.title,
            author: attrs.author,
            period: attrs.period,
            id: attrs.id,
            imageUrl: attrs.imageUrl,
            rotate: attrs.rotate,
            width: attrs.width,
            height: attrs.height,
          });
        } else {
          return slide;
        }
      }),
    });

    ClientAxios.updateSlide(attrs);
  };
  
  handleEditFormSubmit = (attrs) => {
    this.setState( { editFormOpen: false } );
    this.editSlide(attrs);
    
  };


  render() {
    return (
          <div className="AppContainer">

          <div className="topbar">
          <TopBar 
              location={this.props.location}
              uniquePeriods={this.state.uniquePeriodsArray} 
          />
          </div>

          <div className="login">
          <Route path='/login' component={Login} /> 
          </div>

          <div className="logout">
          <Route path='/logout' component={Logout} /> 
          </div>

          <div className="BtnContainer">
            <div className="row">
              <div className="col">
                <div className="playPauseBtns">
                  <Route
                  path='/carousel'
                  render={(routeProps) => <PlayPauseBtns {...routeProps}
                                          onPlay={this.handleCarouselPlay}
                                          onPause={this.handleCarouselPause}
                                          />}
                  />
                </div>
              </div>
              <div className="col">
                <div className="createEditDeleteBtns">
                  <PrivateRoute
                  path='/carousel/admin'
                  render={(routeProps) => <CreateEditDeleteBtns {...routeProps}
                                          onCreate={this.handleCarouselCreate}
                                          onEdit={this.handleCarouselEdit}
                                          onDelete={this.handleCarouselDelete}
                                          />}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="clearFloat"></div>

          <div className="carousel">

            <Route
            path='/carousel'
            render={(routeProps) => <PicCarousel {...routeProps}
                                    intervalSet={this.state.intervalValue}
                                    handleCurrentIndex={this.handleCarouselCurrentIndex}
                                    currentIndex={this.state.currentIndex}
                                    currentSlides={this.state.slides}
                                    />}
            />

          </div>

          <PrivateRoute
            path='/carousel/admin/createSlide'
            render={(routeProps) => <CreateSlide {...routeProps}
                                    onSubmit={this.handleCreateFormSubmit}
                                    onChange={this.onInputChange}
                                    fields={this.state.fields}
                                    slides={this.state.slides}
                                    validate={this.validate}
                                    onCancel={this.handleCancelForm}
                                    createFormOpen={this.state.createFormOpen}
                                    cancelForm={this.state.cancelForm}
                                    />}
            />

          <PrivateRoute
            path='/carousel/admin/editSlide'
            render={(routeProps) => <EditSlide {...routeProps}
                                    onSubmit={this.handleEditFormSubmit}
                                    onChange={this.onInputChange}
                                    fields={this.state.fields}
                                    slides={this.state.slides}
                                    validate={this.validate}
                                    onCancel={this.handleCancelForm}
                                    editFormOpen={this.state.editFormOpen}
                                    cancelForm={this.state.cancelForm}
                                    />}
            />

        </div>

      

    );
  }
}

export default withRouter(App);