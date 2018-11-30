import React, {Component} from 'react';
import {Link} from "react-router-dom";
import Slider from 'react-slick';
import CarouselCard from '../../../carousel/components/CarouselCard';
require('../CategoryView/CategoryView.scss');
require('./ProductView.scss');

/**
 * ListItem renders the individual items in the list
 */
class ProductView extends Component {

    get date() {
       if(!this.props.date) {
           return null;
       }
        let date = new Date(this.props.date);
        return date.toLocaleDateString('en-US');
    }

    render() {
    	if(!this.props.items) {
            return null;
        }
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
                        { this.props.items && this.props.items.map((listItem, index) => {
                    		return (<CarouselCard url={listItem.product.productPage} title={listItem.product.title} image={listItem.product.image} description={listItem.product.sku} />);
                        })}

                        </Slider>
                    </div>
                </div>
            );
    }
}

export default ProductView;