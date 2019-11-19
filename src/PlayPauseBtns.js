import React from 'react';
import {IoIosPlay, IoIosPause} from 'react-icons/io';

const PlayPauseBtns = (props) => {
  return (
  <div>
    <button
          name='button-play'
          onClick={this.onPlayClick}
        >
          Cycle Through Slides   
          <span><IoIosPlay /></span>
    </button>
    {/* <div className="divider"></div> */}
    <button
          name='button-pause'
          onClick={this.onPauseClick}
        >
          Pause Slide   
          <span><IoIosPause /></span>
    </button>

  </div>
 );
}

export default PlayPauseBtns

// import React from 'react';
// import { Button } from 'reactstrap';

// const Example = (props) => {
//   return (
//     <div>
//       <Button color="primary">primary</Button>{' '}
//       <Button color="secondary">secondary</Button>{' '}
//       <Button color="success">success</Button>{' '}
//       <Button color="info">info</Button>{' '}
//       <Button color="warning">warning</Button>{' '}
//       <Button color="danger">danger</Button>{' '}
//       <Button color="link">link</Button>
//     </div>
//   );
// }

// export default Example;