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
    groupedSlides: [],
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
      this.setState({ slides: serverSlides.data })
    )).then(() => {
      const arrayPeriods = this.state.slides.map((slide) => {
        return slide.period;
      });
      return arrayPeriods;
    }).then((arrayPeriods) => {
      const uniquePeriods = arrayPeriods.filter((v, i, a) => a.indexOf(v) === i);
      //console.log("uniquePeriods: "+ uniquePeriods);
      return uniquePeriods;
    }).then((uniquePeriods) => {
      uniquePeriods.sort((a, b) => (
        parseInt(a) - parseInt(b)
      ));
      return uniquePeriods;
    }).then((uniquePeriods) => {
      this.setState({uniquePeriodsArray: uniquePeriods});
    }).then(this.determineAllGroup).then(this.conditionalChainng).then(() => {
        //console.log("Finished with Sorted Group");
    }).catch(function (error) {
      console.log(error); //handle error
    });
  }
  
  determineAllGroup = () => {
    if (this.state.selectedGroup === '' || this.state.selectedGroup === 'PeriodAll') {
      return Promise.resolve(true);;
    }
  }

  conditionalChainng = (value) => {
    if (value) {
      return this.copyAllSlides().then(this.setGroupState);
    } else {
      return this.filterGroup().then(this.setGroupState);

    }
  }

  copyAllSlides = () => {
    const slideAllCopy = this.state.slides.concat();
    return Promise.resolve(slideAllCopy);
  }

  setGroupState = (groupedSlidesSorted) => {
    this.setState({groupedSlides: groupedSlidesSorted});
    return Promise.resolve({groupedSlides: groupedSlidesSorted});
  }

  filterGroup = () => {
    const groupedSlides = this.state.slides.filter(s => s.period === this.state.selectedGroup);
    return Promise.resolve(groupedSlides);
  }

  //       const test = this.state.groupedSlides;
  //       const str2 = JSON.stringify(test, null, 4);
  //       console.log("groupedSlides");
  //       console.log(str2);
        

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
    for (let i = 0; i < this.state.groupedSlides.length; i++) {
        if (this.state.currentIndex === i) {
          currentId = this.state.groupedSlides[i].id;
        break;
        }
    }
    return currentId;
    
  };

  isLastSlide = () => {
    this.handleCarouselPause();
      if (this.state.currentIndex === this.state.groupedSlides.length - 1) {
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


  sortSlides = (slidesSorted) => {
    // Sorting the slides by author

    slidesSorted.sort(function(a, b) {
      var authorA = a.author.toUpperCase(); // ignore upper and lowercase
      var authorB = b.author.toUpperCase(); // ignore upper and lowercase
      if (authorA < authorB) {
        return -1;
      }
      if (authorA > authorB) {
        return 1;
      }
    
      // authors must be equal
      return 0;
    });
      
    return Promise.resolve(slidesSorted);
  }

  setSlideState = (tempSlides) => {
    this.setState({slides: tempSlides});
    return Promise.resolve({slides: tempSlides});
  }

  createSlide = (slide) => {

    if (this.validate()) return;

    const ns = this.newSlide(slide);
    
    new Promise((resolve, reject) => {
      resolve(ns);
    }).then((ns) => {
        const slidesWithNewAdded = this.state.slides.concat(ns);
        return slidesWithNewAdded;
    }).then(this.sortSlides)
    .then((slidesWithNewAddedSorted) => {
        this.setState({
          slides: slidesWithNewAddedSorted,
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
    }).catch(function (error) {
      console.log(error); //handle error
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
    new Promise((resolve, reject) => {
     const tempSlides = this.state.slides.map((slide) => {
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
      });
        resolve(tempSlides);
    }).then(this.sortSlides).then(this.setSlideState).catch(function (error) {
      console.log(error); //handle error
    });
    

    ClientAxios.updateSlide(attrs);
  };
  
  handleEditFormSubmit = (attrs) => {
    this.setState( { editFormOpen: false } );
    this.editSlide(attrs);
    
  };

  handleSetGroup = (group) => {
    this.setState( { selectedGroup: group} );

  };


  render() {
    return (
          <div className="AppContainer">

          <div className="topbar">
          <TopBar 
              location={this.props.location}
              uniquePeriods={this.state.uniquePeriodsArray} 
              setGroup={this.handleSetGroup}
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
                                    currentSlides={this.state.groupedSlides}
                                    />}
            />

          </div>

          <PrivateRoute
            path='/carousel/admin/createSlide'
            render={(routeProps) => <CreateSlide {...routeProps}
                                    onSubmit={this.handleCreateFormSubmit}
                                    onChange={this.onInputChange}
                                    fields={this.state.fields}
                                    slides={this.state.groupedSlides}
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
                                    slides={this.state.groupedSlides}
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