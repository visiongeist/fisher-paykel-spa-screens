import React, {Component} from 'react';
import {MapTo} from '@adobe/cq-react-editable-components';
require('./Image.scss');
/**
 * Default Edit configuration for the Image component that interact with the Core Image component and sub-types
 *
 * @type EditConfig
 */
const ImageEditConfig = {

		emptyLabel: 'Image',

		isEmpty: function(props) {
			return !props || !props.src || props.src.trim().length < 1;
		}
};

/**
 * Image React Component
 * 
 */
export default class Image extends Component {

	constructor(props) {
		super(props);
		this.state = { imageStatus: "loading" };
	}

	handleImageLoaded() {
		this.setState({ imageStatus: "loaded" });
	}

	handleImageErrored() {
		this.setState({ imageStatus: "failed to load" });
	}

	get caption() {
		if(this.props.title && this.props.title.length > 0) {
			return <span className="Image-caption">{this.props.title}</span>;
		}
		return null;
	}

	get content() {
		return <img src={this.props.fileReference} alt={this.props.alt}
		title={this.props.displayPopupTitle && this.props.title}
		onLoad={this.handleImageLoaded.bind(this)}
        onError={this.handleImageErrored.bind(this)}/>
	}

	render() {
		return (<div className="Image">
		{this.content}
		{this.caption}
		{this.state.imageStatus}
		</div>);
	}
}

MapTo('spa-screens/components/content/image')(Image, ImageEditConfig);