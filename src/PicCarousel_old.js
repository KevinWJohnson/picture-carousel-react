import React, { Component } from 'react';
import Carousel from 'react-bootstrap/Carousel'
import { PicGrp1, PicGroup2 } from './picturesGroup1.js';

class PicCarousel extends React.Component {

    render() {        
        return (
            <div className='pictureList'>
              <Carousel>
                {PicGrp1.map((picture, index) => {
                  return (
                    <div key={index}>

                      <img 
                        className="d-block w-100"
                        alt={picture.title}
                        src={picture.imageUrl}
                        width={picture.width}
                        height={picture.height}
                        style={{transform: `rotate(${picture.rotate}deg)`}}
                      />
                      <Carousel.Caption>
                        <h3>{picture.title}</h3>
                        <p>{picture.author}</p>
                      </Carousel.Caption>
                    </div>
                  )
                })}
              </Carousel>
            </div>
        );
    }
   
}

export default PicCarousel;