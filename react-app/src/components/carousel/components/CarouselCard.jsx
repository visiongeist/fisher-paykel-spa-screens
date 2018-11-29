import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './CarouselCard.scss';
/**
 * Props:
 *  - title
 *  - url
 *  - path
 *  - image
 */
export default class CarouselCard extends Component {
    render() {
        return (
            <Link className="CategoryItem" to={this.props.url}>
                <div className="carousel-card">
                    <h3>{this.props.title}</h3>
                    <img src={this.props.image} alt={this.props.title} />
                </div>
            </Link>

        );
    }
}
