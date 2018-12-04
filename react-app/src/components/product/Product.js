/*
    Product.js

    Maps to spa-screens/components/content/product
*/

import React, {Component} from 'react';
import {MapTo} from '@adobe/cq-react-editable-components';
import Footer from '../footer/Footer';
require('./Product.scss');
/**
 * Default Edit configuration for the Product component
 *
 * @type EditConfig
 */
const ProductEditConfig = {

    emptyLabel: 'Product',

    isEmpty: function(props) {
        return !props || !props.productPath || props.productPath.trim().length < 1;
    }
};

/**
 * Product React component
 */
export default class Product extends Component {


    render() {
        return (<div className="product-page">
        <div className="content">
            <div className="information">
                <h5 className="model-number">
                    {this.props.sku}
                </h5>
                <h1 className="title">
                    {this.props.title}
                </h1>
                <h5 className="category">
                    {this.props.category}
                </h5>
                <br />
                <hr />
                <br />
                <div className="description">
                    <strong>
                        {this.props.features[0].description}
                </strong>
                </div>
            </div>
            <div className="img-container">
                <img src={this.props.image} alt={this.props.title} />
            </div>
        </div>
        <div className="footer">
            <Footer />
        </div>
    </div>);
    }
}

MapTo('spa-screens/components/content/product')(Product, ProductEditConfig);