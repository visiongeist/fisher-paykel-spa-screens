/*
    Product.js

    Maps to spa-screens/components/content/product
*/

import React, { Component } from 'react';
import { MapTo } from '@adobe/cq-react-editable-components';
import Footer from '../footer/Footer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Slider from 'react-slick';
require('./Product.scss');
/**
 * Default Edit configuration for the Product component
 *
 * @type EditConfig
 */
const ProductEditConfig = {

    emptyLabel: 'Product',

    isEmpty: function (props) {
        return !props || !props.productPath || props.productPath.trim().length < 1;
    }
};

/**
 * Render the product view
 * @param {any[]} props React props
 */
const ProductComponent = (props) => {
    return (<div className="content">
        <div className="information">
            <h5 className="model-number">
                {props.sku}
            </h5>
            <h1 className="title">
                {props.title}
            </h1>
            <h5 className="category">
                {props.category}
            </h5>
            <br />
            <hr />
            <br />
            <div className="description">
                <strong>
                    {props.description}
                </strong>
            </div>
        </div>
        <div className="img-container">
            <img src={props.image} alt={props.title} />
        </div>
    </div>);
}

const FeaturesComponent = (props) => {
    let settings = {
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        swipeToSlide: true,
        className: "carousel"
    };
    console.log(props)
    return (
        <div className="features">
            <Slider {...settings}>
                {props.features && props.features.map((feature, index) => {
                    return (
                        <div className="feature">
                            <div className="image-container">
                                <img src={feature.imagePath} key={index} alt={index}/>
                            </div>
                            <div className="footer-text">
                                <strong>{feature.title}</strong>
                                <p>{feature.description}</p>
                            </div>
                        </div>
                    )
                })}
            </Slider>
        </div>
    );
}

/**
 * Product React component
 */
export default class Product extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentView: <ProductComponent image={this.props.image}
                description={this.props.features[0].description}
                title={this.props.title}
                sku={this.props.sku}
                category={this.props.category} />,
            selectedCategory: 'product'
        };
    }

    /**
     * Show the product view
     */
    showProduct() {
        this.setState({
            currentView: <ProductComponent image={this.props.image}
                description={this.props.features[0].description}
                title={this.props.title}
                sku={this.props.sku}
                category={this.props.category} />,
            selectedCategory: 'product'
        });
    }

    showFeatures() {
        this.setState({
            selectedCategory: 'features',
            currentView: <FeaturesComponent features={this.props.features} />
        })
    }

    showSpecs() {
        this.setState({ selectedCategory: 'specs' })
    }

    createFooter() {
        let index = 0;
        let footer = [
            (<li key={index++} title="product" onClick={() => this.showProduct()}>
                <div>
                    <FontAwesomeIcon icon={['fa', 'info-circle']} />
                    <div className="textSegment">product</div>
                </div>
            </li>),
            (<li key={index++} title="features" onClick={() => this.showFeatures()}>
                <div>
                    <FontAwesomeIcon icon={['fa', 'clone']} />
                    <div className="textSegment">features</div>
                </div>
            </li>),
            <li key={index++} title="specs" onClick={() => this.showSpecs()}>
                <div>
                    <FontAwesomeIcon icon={['fa', 'ruler-horizontal']} />
                    <div className="textSegment">specs</div>
                </div>
            </li>
        ];
        return footer;
    }

    render() {
        return (<div className="product-page">
            {this.state.currentView}
            <div className="bottom">
                <Footer selectedCategory={this.state.selectedCategory} >
                    {this.createFooter()}
                </Footer>
            </div>
        </div>);
    }
}

MapTo('spa-screens/components/content/product')(Product, ProductEditConfig);