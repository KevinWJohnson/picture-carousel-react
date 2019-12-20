import React, { useState } from 'react';
import {
  Carousel,
  CarouselItem,
  CarouselControl,
  CarouselIndicators,
  CarouselCaption
} from 'reactstrap';

//import uuid from "uuid";

//import { PicGrp1, PicGroup2 } from './picturesGroup1.js';
import { PicGrp1 } from './picturesGroup1.js';



const items = PicGrp1;

  const PicCarousel = (props) => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [animating, setAnimating] = useState(false);
  
    const next = () => {
      if (animating) return;
      const nextIndex = activeIndex === items.length - 1 ? 0 : activeIndex + 1;
      setActiveIndex(nextIndex);
    }
  
    const previous = () => {
      if (animating) return;
      const nextIndex = activeIndex === 0 ? items.length - 1 : activeIndex - 1;
      setActiveIndex(nextIndex);
    }
  
    const goToIndex = (newIndex) => {
      if (animating) return;
      setActiveIndex(newIndex);
    }
  
    const slidesOfPics = items.map((item) => {
      return (
        <CarouselItem
          onExiting={() => setAnimating(true)}
          onExited={() => setAnimating(false)}
          key={item.imageUrl}
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
      <Carousel
        activeIndex={activeIndex}
        next={next}
        previous={previous}
        interval={props.intervalSet}
      >
        <CarouselIndicators items={items} activeIndex={activeIndex} onClickHandler={goToIndex} />
        {slidesOfPics}
        <CarouselControl direction="prev" directionText="Previous" onClickHandler={previous} />
        <CarouselControl direction="next" directionText="Next" onClickHandler={next} />
      </Carousel>
    );
  }
  
  export default PicCarousel;