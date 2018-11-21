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
         let attrs = super.containerProps;
         attrs.className = (attrs.className || '') + ' SpaPage ' + (this.props.cssClassNames || '');
         return attrs
     }
 }
 
 MapTo('spa-screens/components/structure/page')(withComponentMappingContext(withRoute(SpaPage)));
