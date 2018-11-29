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

        let testCards = [];
        for (let index = 1; index <= 40; index++) {
            testCards.push(<CarouselCard number={index} />);
        }
        return (
            
            <div className="carousel-container">     
                <Slider {...settings}>
                   {testCards}
                </Slider>
            </div>
        );
    }
}

export default Carousel;