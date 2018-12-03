import React, {Component} from 'react';
import './Footer.scss';
import {Link} from 'react-router-dom';

export default class Footer extends Component{

    getClasses(categoryItem){
        let selected = categoryItem === this.props.selectedCategory ? ' footer-item--active': ''; 
        return `footer-item${selected}`
    }

    render() {
        return (
            <div className="footer">
               { this.props.categories && this.props.categories.map((categoryItem, index) => {
                    let c = this.getClasses(categoryItem);
                    return (
                        <div key={index} className={c}>
                            <Link key={categoryItem.path} to={categoryItem.url}>
                                <div className="textSegment">{categoryItem.title}</div>
                            </Link>
                        </div>
                    );
                    })}
            </div>
        );  
    }
}