import React from 'react';
import {Swipeable} from 'react-swipeable'
 
class SwipeComponent extends React.Component {
 
  swipedRight = (e, deltaX) => {
    this.props.handleRightSwipe();
    //console.log("You're Swiping to the Right...", e, deltaX);
  }
 
  
  swipedLeft = (e, deltaX) => {
    this.props.handleLeftSwipe();
    //console.log("You're Swiping to the Left...", e, deltaX);
  }
 
 
  render() {
    return (
      <div className='swipeComponent'>
      <Swipeable
        onSwipedRight={this.swipedRight}
        onSwipedLeft={this.swipedLeft}
      >
          {this.props.children}
      </Swipeable>
      </div>
    )
  }
}
export default SwipeComponent;