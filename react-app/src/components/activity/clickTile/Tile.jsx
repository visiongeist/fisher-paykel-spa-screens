import React, { Component } from 'react';
import { withRouter } from 'react-router';
import './Tile.scss';

class Tile extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="row tile" onClick={this.props.onClick}>
                <div className="col-6 col-lg-6 col-md-6 pictureSegment">
                    <img src={this.props.imagePath} alt={this.props.imageDesc} style={{height: this.props.height}}/>
                </div>
                <div className="col-6 col-lg-6 col-md-6  textSegment">{this.props.children}</div>
            </div>
        );
    }
}

export default withRouter(Tile); 
