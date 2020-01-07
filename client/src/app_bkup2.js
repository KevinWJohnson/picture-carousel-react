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
            <Carousel>
                <Carousel.Item>
                    const rotateTxt = "transform:rotate(" + {this.props.rotate} + "deg);"
                    <img
                    className="d-block w-100"
                    src={picture.imageUrl}
                    alt={picture.title}
                    width={picture.width}
                    height={picture.height}
                    style={rotateTxt}
                    />
                    <Carousel.Caption>
                    <h3>{picture.title}</h3>
                    <p>{picture.author}</p>
                    </Carousel.Caption>
                </Carousel.Item>
            
            </Carousel>
        ));
        return (
            <div className='pictureList'>
                {pictureComponents}
            </div>
        );
    }
   
}

ReactDOM.render(
    <PictureList />,
    document.getElementById('root')
);