import React, {Component} from 'react';
import {Link} from "react-router-dom";
require('./PageView.scss');

/**
 * ListItem renders the individual items in the list
 */
class PageView extends Component {

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
	    			return (<Link key={listItem.path} className="PageItem" to={listItem.url}>
		                <div className="pictureSegment">
			                <img src={listItem.image} alt={listItem.description}/>
			            </div>
			            <div className="textSegment">{listItem.title}</div>
		            </Link>);
                })}
	        	</div>
           )
	    }
}

export default PageView;