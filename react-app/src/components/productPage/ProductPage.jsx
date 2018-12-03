import React, { Component } from 'react';
import './ProductPage.scss';

var ProductPage = (props) => {
    return (
        <div className="product-page">
            <div className="information">
                <div className="model-number">
                    <h5>
                    </h5>
                </div>
                <div className="title">
                    <h1>
                    </h1>
                </div>
                <div className="category">
                    <h5>
                    </h5>
                </div>
                <div className="description">
                    <strong>
                    </strong>
                </div>
            </div>
            <div className="img-container"><img src="/unknown.png" alt="no image yet"/></div>
        </div>
    );
}

export default ProductPage;