import React, { Component } from 'react';
import './Footer.scss';

export default class Footer extends Component {
    
    /**
     * Create the class name of a list element depending on if its selected or not
     * @param {string} categoryItem The item in a map to be checked against the selected item
     * @returns {string} class name
     */ 
    getClasses(categoryItem) {
        let selected = categoryItem.title === this.props.selectedCategory ? ' footer-item--active' : '';
        return `footer-item${selected}`
    }

    render() {
        return (
            <div className="footer">
                <ul>
                    {this.props.children && this.props.children.map((categoryItem, index) => {
                        return React.cloneElement(categoryItem, {className: this.getClasses(categoryItem)});
                    })}
                </ul>
            </div>
        );
    }
}