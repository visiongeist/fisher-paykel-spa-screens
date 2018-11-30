import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { withRouter } from 'react-router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './Header.scss';
require('../../utils/Icons');

class Header extends Component {

    render() {
    	let currLocation;
        currLocation = this.props.location.pathname;
        currLocation = currLocation.substr(0, currLocation.length - 5);
        let newLocation = currLocation.substr(0, currLocation.lastIndexOf("/"));

        if (this.props.navigationRoot && currLocation !== this.props.navigationRoot) {
            return (<Link className="Header-action" to={newLocation + ".html"}>
                <FontAwesomeIcon icon="chevron-left" />
            </Link>);
        }
        return null;
    }
}

export default withRouter(Header); 
