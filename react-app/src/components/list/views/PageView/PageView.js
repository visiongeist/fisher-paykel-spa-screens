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
	        if(!this.props.path || !this.props.title || !this.props.url) {
	            return null;
	        }
	        return (
	            <div className="PageItem" onClick={()=> window.location.replace(this.props.url)}>
	                <div className="pictureSegment">
		                <img src={this.props.image} alt={this.props.description}/>
		            </div>
		            <div className="textSegment">{this.props.title}</div>
	            </div>
	        );
	    }
}

export default PageView;