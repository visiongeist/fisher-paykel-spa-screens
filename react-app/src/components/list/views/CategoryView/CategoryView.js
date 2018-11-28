import React, {Component} from 'react';
import {Link} from "react-router-dom";
require('./CategoryView.scss');

/**
 * ListItem renders the individual items in the list
 */
class CategoryView extends Component {

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
            <li className="CategoryItem">
                <Link className="CategoryItem-link" to={this.props.url}>{this.props.title}
                    <span className="CategoryItem-date">{this.date}</span>
                </Link>
            </li>
        );
    }
}

export default CategoryView;