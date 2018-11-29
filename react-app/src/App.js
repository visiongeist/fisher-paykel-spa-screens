import React from 'react';
import { Page, withModel } from '@adobe/cq-react-editable-components';
import { Redirect } from 'react-router';
import Activity from './components/activity/Activity.jsx';
import "slick-carousel/slick/slick.scss";
import "slick-carousel/slick/slick-theme.scss";
import Carousel from './components/carousel/Carousel.jsx';


/**
 * Returns a model path from the given URL
 * @param {string} url     - Path from which to extract a model path
 * @return {string|undefined}
 */
function getModelPath(url) {
    if (!url) {
        return;
    }

    let dotIndex = url.indexOf(".");
    return url.substr(0, dotIndex > -1 ? dotIndex : url.length);
}

/**
 * Should the App redirect to the home page
 *
 * @param {string} modelUrl     - Path of the current model
 * @return {boolean}
 */
function canRedirectHome(modelUrl, pathname) {
    if (!pathname) {
        return false;
    }
    const currentUrl = getModelPath(pathname);
    // 1. if a model url has been provided
    // 2. if the current URL is located under the content
    // 3. if app root model path equals the current URL
    return modelUrl && modelUrl.indexOf('/content/') > -1 && (modelUrl === currentUrl || modelUrl.endsWith(currentUrl));
}

// This component is the application entry point
class App extends Page {

    get redirect() {
        const modelRootPath = this.props.cqPath;
        const locationPathname = this.props.locationPathname;

        if (canRedirectHome(modelRootPath, locationPathname)) {
            // Redirect to the home url
            return <Redirect to={modelRootPath + '/home.html'} />;
        }
        return null;
    }

    render() {
        return (
            <div className="App">
                <Activity>
                    <Carousel categoryName="Counter-Depth Refrigeration" />
                </Activity>

            </div>
        );
    }
}

export default withModel(App);