import React, { Component } from 'react';
import './Activity.scss';

class Activity extends Component {
    render() {
        return(
            <div className="activity">
                {this.props.children}
            </div>
        );
    }
}

export default Activity;