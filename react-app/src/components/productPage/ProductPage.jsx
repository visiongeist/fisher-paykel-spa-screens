import React, { Component } from 'react';
import './ProductPage.scss';

/**
 * Props:
 * - model number
 * - title
 * - category
 * - description
 * - image
 */
export default class ProductPage extends Component {
    render() {
        return (
            <div className="product-page">
                <div className="content">
                    <div className="information">
                        <h5 className="model-number">
                            {this.props.modelNumber}
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
                                {this.props.description}
                        </strong>
                        </div>
                    </div>
                    <div className="img-container">
                        <img src={this.props.image} alt={this.props.title} />
                    </div>
                </div>
            </div>
        );
    }
}
