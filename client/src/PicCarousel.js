import React, { useState } from 'react';
import {
  Carousel,
  CarouselItem,
  CarouselControl,
  CarouselIndicators,
  CarouselCaption
} from 'reactstrap';
import SwipeComponent from './SwipeComponent';
import './PicCarousel.css';


  const PicCarousel = (props) => {
    const items = props.currentSlides;
    const [animating, setAnimating] = useState(false);
  
    const next = () => {
      if (animating) return;
      const nextIndex = props.currentIndex === items.length - 1 ? 0 : props.currentIndex + 1;
      props.handleCurrentIndex(nextIndex);
    }
  
    const previous = () => {
      if (animating) return;
      const nextIndex = props.currentIndex === 0 ? items.length - 1 : props.currentIndex - 1;
      props.handleCurrentIndex(nextIndex);
    }
  
    const goToIndex = (newIndex) => {
      if (animating) return;
      props.handleCurrentIndex(newIndex);
    }
  
    const rightSwipe = () => {
      previous();
    }

    const leftSwipe = () => {
      next();
    }

    const slidesOfPics = items.map((item) => {
      return (
        <CarouselItem
          onExiting={() => setAnimating(true)}
          onExited={() => setAnimating(false)}
          key={item.id}
        >
          <img 
                        className="d-block w-100"
                        alt={item.title}
                        src={item.imageUrl}
                        width={item.width}
                        height={item.height}
                        style={{transform: `rotate(${item.rotate}deg)`}}
                      />
          <CarouselCaption captionText={item.author} captionHeader={item.title} />
        </CarouselItem>
      );
    });
   
    return (
      <SwipeComponent
        handleRightSwipe={rightSwipe}
        handleLeftSwipe={leftSwipe}
      >
        <Carousel
          activeIndex={props.currentIndex}
          next={next}
          previous={previous}
          interval={props.intervalSet}
        >
          <CarouselIndicators items={items} activeIndex={props.currentIndex} onClickHandler={goToIndex} />
          {slidesOfPics}
          <CarouselControl direction="prev" directionText="Previous" onClickHandler={previous} />
          <CarouselControl direction="next" directionText="Next" onClickHandler={next} />
        </Carousel>
      </SwipeComponent>
    );
  }
  
  export default PicCarousel;