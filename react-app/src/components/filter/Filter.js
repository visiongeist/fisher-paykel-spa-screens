import React, {Component} from 'react';
import {MapTo} from '@adobe/cq-react-editable-components';
import {Link} from "react-router-dom";
require('./Filter.scss');


const FilterEditConfig = {

    emptyLabel: 'Filter',

    isEmpty: function(props) {
        return !props || !props.items || props.items.length < 1;
    }
};


/**
 * Renders the filter type and options from spa-screens/components/content/filter
 */
export default class Filter extends Component {
    render() {
        return (
                <div className="Filter">
                    <p>Filter by {this.props.filterBy} with the below:</p>
                    <ul>
                      {this.props.values.map(value => <li>{value}</li>)}
                    </ul>  
                </div>
        );
    }
}
 
MapTo("spa-screens/components/content/filter")(Filter, FilterEditConfig);