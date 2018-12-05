import React, {Component} from 'react';
import './ImageMap.scss';
/**
 * Image map component which swaps images depending on where it is clicked.
 */
export default class ImageMap extends Component {
    render(){
        return (
            <div className="image-map">
                <img src={this.props.image} alt={this.props.title} />
            </div>
        );
    }
}