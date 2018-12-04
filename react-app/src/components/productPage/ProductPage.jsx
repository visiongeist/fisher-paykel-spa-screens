import React, { Component } from 'react';
import './ProductPage.scss';

export default class ProductPage extends Component {
    render() {
        return (
            <div className="product-page">
                <div className="information">
                    <div className="model-number">
                        <h5>
                            what
                        </h5>
                    </div>
                    <div className="title">
                        <h1>
                            who
                        </h1>
                    </div>
                    <div className="category">
                        <h5>
                            when
                        </h5>
                    </div>
                    <hr />
                    <div className="description">
                        <strong>
                            why
                        </strong>
                    </div>
                </div>
                <div className="img-container"><img src="fridges/fridge-534L.png" alt="none yet"/></div>
            </div>
        );
    }
}
