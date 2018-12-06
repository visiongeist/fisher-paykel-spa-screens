import React, { Component } from 'react';
import ImageMapper from 'react-image-mapper';
import './ImageMap.scss';
/**
 * Image map component which swaps images depending on where it is clicked.
 */
export default class ImageMap extends Component {

    constructor(props) {
        super(props);
        this.startImage = this.props.image;
        this.state = {
        };
    }

    /**
     * Change the image to the one referenced by the link and add the new area mappings
     */
    changeImage(destinationPath) {
        this.setState({ image: destinationPath });
    }

    /**
     * Go back to the initial landing state, for when the opened image is clicked.
     */
    loadFirstImage() {
        if (this.state.image !== this.startImage) {
            this.setState({
                image: this.startImage,
                mappings: this.props.hotSpots,
            });
        }
    }

    componentDidMount() {
        const height = this.divElement.clientHeight;
        const width = this.divElement.clientWidth;
        this.setState({
            imageHeight: height,
            imageWidth: width
        });
    }

    componentDidUpdate() {
    }

    render() {
        return (
            <div ref={(divElement) => this.divElement = divElement} className="click-map" onClick={() => this.loadFirstImage()}>
                {/* <img src={this.state.image} alt="map" useMap="#image-map" />
                <map name="image-map">
                    {this.state.mappings && this.state.mappings.map((area, index) => {
                        return <area key={index} shape={area.shape} coords={area.coordinates} alt={index} href="#" onClick={() => this.changeImage(area.destinationPath)} />
                    })}
                </map> */}
                <ImageMapper src={this.props.image} width={this.state.imageWidth} height={this.state.imageHeight} />
            </div>
        );
    }
}