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
    	if(!this.props.items) {
            return null;
        }
        return (
        	<div className={this.props.listClass}>
        	{ this.props.items && this.props.items.map((listItem, index) => {
        		return (<li key={listItem.path} className="CategoryItem">
	                <Link className="CategoryItem-link" to={listItem.url}>{listItem.title}
	                    <span className="CategoryItem-date">{this.date}</span>
	                </Link>
	            </li>);
            })}
        	</div>
       )
            
    }
}

export default CategoryView;