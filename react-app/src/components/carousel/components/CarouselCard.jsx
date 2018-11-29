import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './CarouselCard.scss';
/**
 * Props:
 *  - title
 *  - url
 *  - path
 *  - image
 *  - description
 */
export default class CarouselCard extends Component {
    render() {
        return (
            <Link className="CategoryItem" to={this.props.url}>
                <div className="carousel-card">
                    <img src={this.props.image} alt={this.props.title} />
                    <h4>{this.props.title}</h4>
                    <h5>{this.props.description}</h5>
                </div>
            </Link>

        );
    }
}
