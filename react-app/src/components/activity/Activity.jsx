import React, { Component } from 'react';

class Activity extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tileHeight: this.props.viewHeight / this.props.children.length
        }
    }

    render() {
        let newChildren = this.props.children.map((item, i) => {
            let elem = React.cloneElement(item, {height: `${this.state.tileHeight}vh`, key: i});
            console.log(elem.props.height);
            return elem;
        });
        return(
            <div className="activity">
                {newChildren}
            </div>
        );
    }
}

export default Activity;