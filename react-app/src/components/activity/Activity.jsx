import React, { Component } from 'react';

class Activity extends Component {
    constructor(props) {
        super(props);
        let tileHeight = this.props.viewHeight / this.props.children.length;
        this.state = {
            newChildren: this.props.children.map((item, i) => {
                return  React.cloneElement(item, {height: `${tileHeight}vh`, key: i});
            })
        }
    }

    render() {
        return(
            <div className="activity">
                {this.state.newChildren}
            </div>
        );
    }
}

export default Activity;