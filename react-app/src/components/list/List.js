import React, {Component} from 'react';
import {MapTo} from '@adobe/cq-react-editable-components';
import {Link} from "react-router-dom";
require('./List.scss');


const ListEditConfig = {

    emptyLabel: 'List',

    isEmpty: function(props) {
        return !props || !props.items || props.items.length < 1;
    }
};

/**
 * ListItem renders the individual items in the list
 */
class ListItem extends Component {

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
            <li className="ListItem">
                <Link className="ListItem-link" to={this.props.url}>{this.props.title}
                    <span className="ListItem-date">{this.date}</span>
                    {this.props.height ? <span className="ListItem-dimension">H {this.props.height} x W {this.props.width} x D {this.props.depth}</span> : ""} 
                </Link>
            </li>
        );
    }
}

/**
 * List renders the list contents and maps spa-screens/components/content/list
 */
export default class List extends Component {
    render() {
    	let view = this.props.renderType;
    	var results;
    	if(view == "ProductView"){
    		results = this.props.items.map((listItem, index) => {
                return <ListItem height={listItem.product.height} width={listItem.product.width}
				 depth={listItem.product.depth}
				 key={listItem.path} path={listItem.path} url={listItem.url} 
                title={listItem.title} date={listItem.lastModified} />
});
    	} else {
    		results = this.props.items.map((listItem, index) => {
                return <ListItem key={listItem.path} path={listItem.path} url={listItem.url} 
                title={listItem.title} date={listItem.lastModified} />
});
    	}
    	
        return (
                <div className="List">
                    <ul className="List-wrapper">
                        { results}
                    </ul>
                </div>
        );
    }
}
 
MapTo("spa-screens/components/content/list")(List, ListEditConfig);