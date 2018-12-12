import React, { Component } from 'react';
import ImageMapper from 'react-image-mapper';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
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
            imageWidth: width,
        });
    }

    componentDidUpdate() {
    }

    render() {
        return (
            <div ref={(divElement) => this.divElement = divElement} className="click-map" onClick={() => this.loadFirstImage()}>
                <img src={this.state.image} alt="map" useMap="#image-map" />
                {this.state.mappings && this.state.mappings.map((area, index) => {
                        let coord = [];
                        if(area.coordinates) {
                            coord = area.coordinates.split(",");
                            coord[0] = coord[0] * (this.state.imageHeight/3840);
                            coord[1] = coord[1] * (this.state.imageWidth/2160);
                            console.log(coord);
                            let top = -(coord[1]);
                            return (<div style={{position:'relative', top: top + 'px', left: '0px', color: 'blue'}}><FontAwesomeIcon icon={['fa', 'info-circle']} /></div>)
                        }
                    })}
                <map name="image-map">
                    {this.state.mappings && this.state.mappings.map((area, index) => {
                        console.log(area.coordinates);
                        let coord = [];
                        if(area.coordinates) {
                            coord = area.coordinates.split(",");
                            coord[0] = coord[0] * (this.state.imageHeight/3840);
                            coord[1] = coord[1] * (this.state.imageWidth/2160);
                            console.log(coord);
                            
                            return <area key={index} shape={area.shape} coords={coord.toString()} alt={index} href="#" onClick={() => this.changeImage(area.destinationPath)} />
                        }
                    })}
                </map>
            </div>
        );
    }
}