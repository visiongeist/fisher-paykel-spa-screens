import React, { Component } from 'react';
import './CarouselCard.scss';

export default class CarouselCard extends Component {
    render() {
        return (
            <div className="carousel-card">
                <h3>{this.props.number}</h3>
            </div>
        );
    }
}
