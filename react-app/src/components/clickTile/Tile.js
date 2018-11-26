import React, { Component } from 'react';
import { withRouter } from 'react-router';
import './Tile.scss';

class Header extends Component {

    render() {
        return (
            <div className="container tile">
                <div className="row" onClick={this.props.onClick}>
                    <div className="col-6 col-lg-6 col-md-6 pictureSegment"><img src={this.props.imagePath} alt={this.props.imageDesc}/></div>
                    <div className="col-6 col-lg-6 col-md-6  textSegment">{this.props.children}</div>
                </div>
            </div>
        );
    }
}

export default withRouter(Header); 
