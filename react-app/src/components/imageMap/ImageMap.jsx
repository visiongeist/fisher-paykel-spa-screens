import React, { Component } from 'react';
import './ImageMap.scss';
/**
 * Image map component which swaps images depending on where it is clicked.
 */
export default class ImageMap extends Component {

    constructor(props) {
        super(props);
        this.startImage = this.props.image;
        this.state = {
            image: this.startImage,
            mappings: this.props.hotSpots,
        };
    }

    /**
     * Change the image to the one referenced by the link and add the new area mappings
     */
    changeImage(destinationPath) {
        this.setState({image: destinationPath});
    }

    /**
     * Go back to the initial landing state, for when the opened image is clicked.
     */
    loadFirstImage(){
        if (this.state.image !== this.startImage){
            this.setState({
                image: this.startImage,
                mappings: this.props.hotSpots,
            });
        }
    }

    render() {
        return (
            <div className="click-map" onClick={() => this.loadFirstImage()}>
                <img src={this.state.image} alt="map" useMap="#image-map" />
                <map name="image-map">
                    {this.state.mappings && this.state.mappings.map((area, index) => {
                        return <area key={index} shape={area.shape} coords={area.coordinates} alt={index} onClick={() => this.changeImage(area.destinationPath)} />
                    })}
                </map>
            </div>
        );
    }
}