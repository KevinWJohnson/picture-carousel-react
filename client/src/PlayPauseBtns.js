import React from 'react';
import {IoIosPlay, IoIosPause} from 'react-icons/io';
import './PlayPauseBtns.css';

const PlayPauseBtns = (props) => {

  const handlePlay = () => {
    props.onPlay();
  };

  const handlePause = () => {
    props.onPause();
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
  </div>
 );
}

export default PlayPauseBtns