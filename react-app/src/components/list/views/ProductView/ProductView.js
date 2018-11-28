import React, {Component} from 'react';
import {Link} from "react-router-dom";
require('./ProductView.scss');

/**
 * ListItem renders the individual items in the list
 */
class ProductView extends Component {

    get date() {
       if(!this.props.date) {
           return null;
       }
        let date = new Date(this.props.date);
        return date.toLocaleDateString('en-US');
    }

    render() {
        if(!this.props.path || !this.props.title || !this.props.url) {
            return null;
        }
        return (
            <li className="ProductItem">
                <Link className="ProductItem-link" to={this.props.url}>{this.props.title}
                    <span className="ListItem-date">{this.date}</span>
                </Link>
            </li>
        );
    }
}

export default ProductView;