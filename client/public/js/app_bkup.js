import Carousel from 'react-bootstrap/Carousel'

class PictureList extends React.Component {
    state = {
        pictures: [],
    };

    componentDidMount() {
        this.setState({pictures: PicGrp1.pictures});
    }

    render() {
        const pictureComponents = pictures.map((picture, index) => (
            <Picture
                key={'picture-' + picture.index}
                title={picture.title}
                author={picture.author}
                imageUrl={picture.imageUrl}
                rotate={picture.rotate}
                width={picture.width}
                height={picture.height}
            />
        ));
        return (
            <div className='pictureList'>
                {pictureComponents}
            </div>
        );
    }
   
}

class Picture extends React.Component {

    return (
           
               
                <Carousel>
                <Carousel.Item>
                const rotateTxt = "transform:rotate(" + {this.props.rotate} + "deg);"
                    <img
                    className="d-block w-100"
                    src={this.props.imageUrl}
                    alt={this.props.title}
                    width={this.props.width}
                    height={this.props.height}
                    style={rotateTxt}
                    />
                    <Carousel.Caption>
                    <h3>{this.props.title}</h3>
                    <p>{this.props.author}</p>
                    </Carousel.Caption>
                </Carousel.Item>
                    
                </Carousel>
  );
}

render(<ControlledCarousel />);
        );
    }
}