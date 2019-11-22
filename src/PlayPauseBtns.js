import React from 'react';
import {IoIosPlay, IoIosPause} from 'react-icons/io';

const PlayPauseBtns = (props) => {

  const handlePlay = () => {
    this.props.onPlay();
  }

  const handlePause = () => {
    this.props.onPause();
  }

  return (
  <div>
    <button
          name='button-play'
          onClick={() => handlePlay}
        >
          Cycle Through Slides   
          <span><IoIosPlay /></span>
    </button>
    {/* <div className="divider"></div> */}
    <button
          name='button-pause'
          onClick={() => handlePause}
        >
          Pause Slide   
          <span><IoIosPause /></span>
    </button>

  </div>
 );
}

export default PlayPauseBtns