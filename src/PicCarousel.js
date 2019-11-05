import React, { Component } from 'react';
import Carousel from 'react-bootstrap/Carousel'
import { PicGrp1, PicGroup2 } from './picturesGroup1.js';

class PicCarousel extends React.Component {
    state = {
        // pictures: [],
        pictures: [
            {
              title: 'Ocotillo1',
              author: 'John Smith',
              imageUrl: require('./images/group1/IMG_0059.JPG'),
              rotate: '90',
              width: '460',
              height: '345',
            },
            {
              title: 'Ocotillo2',
              author: 'Jane Johnson',
              imageUrl: require('./images/group1/IMG_0062.JPG'),
              rotate: '90',
              width: '460',
              height: '345',
            },
            {
              title: 'Catus Flower',
              author: 'Mark Benson',
              imageUrl: require('./images/group1/IMG_0064.JPG'),
              rotate: '0',
              width: '460',
              height: '345',
            },
            {
              title: 'Mountains',
              author: 'Maria Lopez',
              imageUrl: require('./images/group1/IMG_0095.JPG'),
              rotate: '0',
              width: '460',
              height: '345',
            },
          ]
    };

    render() {        
        const { pictures } = this.state
        return (
            <div className='pictureList'>
              <Carousel>
                {pictures.map((picture, index) => {
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
                  // return (
                  //   <Carousel.Item key={index}>
                  //     <img
                  //       className="d-block w-100"
                  //       source={require(picture.imageUrl)}
                  //       alt={picture.title}
                  //       width={picture.width}
                  //       height={picture.height}
                  //       style={{transform: `rotate(${picture.rotate}deg)`}}
                  //     />
                  //     <Carousel.Caption>
                  //       <h3>{picture.title}</h3>
                  //       <p>{picture.author}</p>
                  //     </Carousel.Caption>
                  // </Carousel.Item>
                  // )
                })}
              </Carousel>
            </div>
        );
    }
   
}

export default PicCarousel;