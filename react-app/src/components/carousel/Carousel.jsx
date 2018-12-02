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
                        <CarouselCard url="/1" title="＼（＾▽＾）／" image="/fridges/fridge-373.jpg" description="Contemporary" />
                        <CarouselCard url="/2" title="ヾ(＠°▽°＠)ﾉ" image="/fridges/fridge-373.jpg" description="I'm obviously exploring my kanjmojies" />
                        <CarouselCard url="/3" title="|ω･)و ̑̑༉" image="/fridges/fridge-373.jpg" description="Carousel thingy" />
                        <CarouselCard url="/4" title="(=ｘェｘ=)" image="/fridges/fridge-373.jpg" description="This weird thing" />
                        <CarouselCard url="/5" title="へ（>_<へ)" image="/fridges/fridge-373.jpg" description="This weird thing" />
                        <CarouselCard url="/6" title="✖‿✖" image="/fridges/fridge-373.jpg" description="This weird thing" />
                        <CarouselCard url="/7" title="(＊0＊;)" image="/fridges/fridge-373.jpg" description="This weird thing" />
                        <CarouselCard url="/8" title="ヘ(゜Д、゜)ノ" image="/fridges/fridge-373.jpg" description="This weird thing" />

                    </Slider>
                </div>
            </div>
        );
    }
}

export default Carousel;