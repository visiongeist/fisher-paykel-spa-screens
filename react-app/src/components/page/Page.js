/*
    Page.js

    - SPA specific implementation of Page
    - Maps to spa-screens/components/structure/page
*/

import {Page, MapTo, withComponentMappingContext } from "@adobe/cq-react-editable-components";
import {withRoute} from '../../utils/RouteHelper';
require('./Page.css');
 // This component is a variant of a React Page component mapped to the "structure/page" resource type
 // No functionality is changed other than to add an app specific CSS class
 class SpaPage extends Page {
 
     get containerProps() {
         console.log("Setting container attributes");
         let attrs = super.containerProps;
         attrs.className = (attrs.className || '') + ' SpaPage ' + (this.props.cssClassNames || '');
         attrs['ceddl-observe'] = 'page';
         attrs['data-title'] = this.props.title || '';
         let pagePaths = this.props.cqPath.split('/');
         let pageName = this.props.cqPath.substring(1).replace(new RegExp('/', 'g'), ':');
         pageName = pageName.replace("content:", "");
         attrs['data-name'] = pageName;
         if(null !== pagePaths && pagePaths.length > 4){
			attrs['data-section'] = pagePaths[4];
		 } else {
            attrs['data-section'] = pagePaths[2];
         }
         if(null !== pagePaths && pagePaths.length > 1){
			attrs['data-site'] = pagePaths[2];
		 }
         return attrs
     }

 }
 
 MapTo('spa-screens/components/structure/page')(withComponentMappingContext(withRoute(SpaPage)));
