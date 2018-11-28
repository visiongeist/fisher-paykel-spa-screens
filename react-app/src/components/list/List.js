import React, {Component} from 'react';
import {MapTo} from '@adobe/cq-react-editable-components';
import PageView from "./views/PageView/PageView";
import CategoryView from "./views/CategoryView/CategoryView";
import ProductView from "./views/ProductView/ProductView";
require('./List.scss');


const ListEditConfig = {

    emptyLabel: 'List',

    isEmpty: function(props) {
        return !props || !props.items || props.items.length < 1;
    }
};

/**
 * List renders the list contents and maps spa-screens/components/content/list
 */
export default class List extends Component {
    render() {
    	
    	let ListItem = PageView;
    	let listClass = "List PageList";
    	if(this.props.renderType === 'CategoryView') {
    		ListItem = CategoryView;
    		listClass = "List CategoryList";
    	}
    	if(this.props.renderType === 'ProductView') {
    		ListItem = ProductView;
    		listClass = "List ProductList";
    	}
    	
        return (
                <div className={listClass}>
                    { this.props.items && this.props.items.map((listItem, index) => {
	                        return <ListItem key={listItem.path} path={listItem.path} url={listItem.url} 
                                 title={listItem.title} date={listItem.lastModified} image={listItem.image} description={listItem.description} />
	                        })
	                   }
                </div>
        );
    }
}
 
MapTo("spa-screens/components/content/list")(List, ListEditConfig);