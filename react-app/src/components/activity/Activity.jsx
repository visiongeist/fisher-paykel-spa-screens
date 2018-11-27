import React, { Component } from 'react';

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