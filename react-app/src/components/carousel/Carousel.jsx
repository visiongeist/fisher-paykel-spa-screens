import Slider from 'react-slick';
import React, {Component} from 'react';
import './Carousel.scss';
import CarouselCard from './components/CarouselCard';

class Carousel extends Component{
    render() {
        const settings = {
            dots: true,
            infinite: true,
            speed: 500,
            slidesToShow: 4,
            slidesToScroll: 4,
            arrows: true,
            className: "carousel",
            // accessibility: true
        };

        return (
            <div className="category-view">
                <div className="header">
                    <h2>
                        {this.props.categoryName}
                    </h2>
                </div>
                <div className="carousel-container">     
                    <Slider {...settings}>
                    <CarouselCard url="/mmhmm" title="This weird thing" image="/fridges/fridge-373.jpg"/>
                    </Slider>
                </div>
            </div>
        );
    }
}

export default Carousel;