import Slider from 'react-slick';
import React, { Component } from 'react';
import './Carousel.scss';
import CarouselCard from './components/CarouselCard';

class Carousel extends Component {
    render() {
        const settings = {
            dots: true,
            infinite: true,
            speed: 500,
            slidesToShow: 4,
            slidesToScroll: 2,
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
                        <CarouselCard url="/mmhmm" title="＼（＾▽＾）／" image="/fridges/fridge-373.jpg" description="Contemporary" />
                        <CarouselCard url="/mmhmm" title="ヾ(＠°▽°＠)ﾉ" image="/fridges/fridge-373.jpg" description="I'm obviously exploring my kanjmojies" />
                        <CarouselCard url="/mmhmm" title="|ω･)و ̑̑༉" image="/fridges/fridge-373.jpg" description="Carousel thingy" />
                        <CarouselCard url="/mmhmm" title="(=ｘェｘ=)" image="/fridges/fridge-373.jpg" description="This weird thing" />
                        <CarouselCard url="/mmhmm" title="へ（>_<へ)" image="/fridges/fridge-373.jpg" description="This weird thing" />
                        <CarouselCard url="/mmhmm" title="✖‿✖" image="/fridges/fridge-373.jpg" description="This weird thing" />
                        <CarouselCard url="/mmhmm" title="(＊0＊;)" image="/fridges/fridge-373.jpg" description="This weird thing" />
                        <CarouselCard url="/mmhmm" title="ヘ(゜Д、゜)ノ" image="/fridges/fridge-373.jpg" description="This weird thing" />

                    </Slider>
                </div>
            </div>
        );
    }
}

export default Carousel;