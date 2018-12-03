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
    	
    	let ListView = PageView;
    	let listClass = "List PageList";
    	if(this.props.renderType === 'CategoryView') {
    		ListView = CategoryView;
    		listClass = "List CategoryList";
    	}
    	if(this.props.renderType === 'ProductView') {
    		ListView = ProductView;
    		listClass = "List ProductList";
    	}
    	
        return (
           <ListView items={this.props.items} title={this.props.title} selectedCategory={this.props.selectedCategory} categories={this.props.categories} listClass={listClass}/>
        );
    }
}
 
MapTo("spa-screens/components/content/list")(List, ListEditConfig);