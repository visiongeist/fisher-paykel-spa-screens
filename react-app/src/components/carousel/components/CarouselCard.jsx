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
        let title = this.props.title;
        return (
            <Link className="CategoryItem" to={this.props.url}>
                <div className="carousel-card">
                    <div className="img-container">
                        <img src={this.props.image} alt={this.props.title} />
                    </div>
                    <div className="info-container">
                        <h4 dangerouslySetInnerHTML={{__html: title}}/>
                        <h5>{this.props.description}</h5>
                    </div>
                </div>
            </Link>

        );
    }
}
