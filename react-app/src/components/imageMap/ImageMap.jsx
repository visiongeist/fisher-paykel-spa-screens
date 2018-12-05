import React, { Component } from 'react';
import './ImageMap.scss';
/**
 * Image map component which swaps images depending on where it is clicked.
 */
export default class ImageMap extends Component {

    constructor(props) {
        super(props);
        this.state = {
            image: this.props.image,
            mappings: this.props.mapping,
        };
    }

    /**
     * Change the image to the one referenced by the link and add the new area mappings
     */
    changeImage() {
        console.log('mm');
    }

    render() {
        return (
            <div className="click-map">
                <img src={this.state.image} alt="map" usemap="#image-map" />
                <map name="image-map">
                    {this.state.mappings && this.state.mappings.map((area, index) => {
                        return <area key={index} shape={area.shape} coords={area.coords} alt={index} onClick={() => this.changeImage()} />
                    })}
                </map>
            </div>
        );
    }
}