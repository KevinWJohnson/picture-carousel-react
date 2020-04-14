import React from 'react';
import {IoIosPlay, IoIosPause, IoMdAdd, IoMdRemove} from 'react-icons/io';
import './PlayPauseBtns.css';

const PlayPauseBtns = (props) => {

  const handlePlay = () => {
    props.onPlay();
  };

  const handlePause = () => {
    props.onPause();
  };

  const handleZoomIn = () => {
    props.onZoomIn();
  };

  const handleZoomOut = () => {
    props.onZoomOut();
  };

  return (
  <div id='outer-ppBtns'>
    <div className='inner-ppBtns'>
      <button
            id='buttonPlay'
            name='button-play'
            onClick={handlePlay}
          >
            Cycle Through Slides
            <span>  <IoIosPlay /></span>
      </button>
    </div>
    {/* <div className="divider"></div> */}
    <div className='inner-ppBtns'>
      <button
            id='buttonPause'
            name='button-pause'
            onClick={handlePause}
          >
            Pause Slide
            <span>  <IoIosPause /></span>
      </button>
    </div>
    <div className='inner-ppBtns'>
      <button
            id='buttonZoomOut'
            name='button-ZoomOut'
            onClick={handleZoomOut}
          >
            Zoom Out
            <span>  <IoMdRemove /></span>
      </button>
    </div>
    <div className='inner-ppBtns'>
      <button
            id='buttonZoomIn'
            name='button-ZoomIn'
            onClick={handleZoomIn}
          >
            Zoom In
            <span>  <IoMdAdd /></span>
      </button>
    </div>
  </div>
 );
}

export default PlayPauseBtns