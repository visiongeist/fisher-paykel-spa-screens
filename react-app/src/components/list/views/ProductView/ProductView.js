import React, { Component } from 'react';
import Slider from 'react-slick';
import CarouselCard from '../../../carousel/components/CarouselCard';
import Footer from '../../../footer/Footer';
import {Link} from 'react-router-dom';
require('../CategoryView/CategoryView.scss');
require('./ProductView.scss');

/**
 * ListItem renders the individual items in the list
 */
class ProductView extends Component {

    get date() {
        if (!this.props.date) {
            return null;
        }
        let date = new Date(this.props.date);
        return date.toLocaleDateString('en-US');
    }

    render() {
        if (!this.props.items) {
            return null;
        }
        const settings = {
            dots: true,
            infinite: true,
            speed: 500,
            slidesToShow: 4,
            swipeToSlide: true,
            arrows: true,
            className: "carousel",
            // accessibility: true
        };
        return (
            <div className="category-view">
                <div className="header">
                    <h2>
                        {this.props.title}
                    </h2>
                </div>
                <div className="carousel-container">
                    <Slider {...settings}>
                        {this.props.items && this.props.items.map((listItem, index) => {
                            return (<CarouselCard key={index} url={listItem.product.productPage} title={listItem.product.title} image={listItem.image} description={listItem.product.sku} />);
                        })}
                    </Slider>
                </div>
                <div id="product-footer">
                    <Footer categories={this.props.categories} selectedCategory={this.props.selectedCategory}>
                        {this.props.categories && this.props.categories.map((categoryItem, index) => {
                            return (
                                <li key={index}>
                                    <Link key={categoryItem.path} to={categoryItem.url}>
                                        <div className="textSegment">{categoryItem.title}</div>
                                    </Link>
                                </li>
                            );
                        })}
                    </Footer>
                </div>
            </div>
        );
    }
}

export default ProductView;