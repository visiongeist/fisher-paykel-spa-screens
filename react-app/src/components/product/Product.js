/*
    Product.js

    Maps to spa-screens/components/content/product
*/

import React, {Component} from 'react';
import {MapTo} from '@adobe/cq-react-editable-components';
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
        return (<div className="Text">
                Product Information Placeholder
            </div>);
    }
}

MapTo('spa-screens/components/content/product')(Product, ProductEditConfig);