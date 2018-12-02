import React, { Component } from 'react';
import { withRouter } from 'react-router';
import './Tile.scss';

class Tile extends Component {
    render() {
        return (
            <div className="row tile" onClick={this.props.onClick}>
                <div className="pictureSegment">
                    <img src={this.props.imagePath} alt={this.props.imageDesc}/>
                </div>
                <div className="textSegment">{this.props.children}</div>
            </div>
        );
    }
}

export default withRouter(Tile); 
