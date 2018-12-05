
/*
 *
 * Copyright 2016 Adobe Systems Incorporated
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/* globals ES6Promise */
require([
    'jquery',
    'util/ScreensChannel'
], function($, Channel) {
    'use strict';

    ES6Promise.polyfill();

    // get the display data from the current channel
    $(function() {
    	console.log("Channel display: " + Channel.getDisplay());
        if (Channel.getDisplay()) {

            // On success, pass the display and device info to the app
            var handleDisplayDataSuccess = function(displayData) {
                console.log('Instore got data:', displayData);
                //var displayDataStr = CircularJSON.stringify(displayData);

                var locationArr = displayData.display.path.split("/"),
                    location = locationArr[locationArr.length-1]

				var localStorage = window.localStorage;
                if(localStorage.getItem('deviceID')) {
                    console.log(localStorage.getItem('deviceID'));
                }
                localStorage.setItem('deviceID', location);
                console.log("device: " + location);
            }

            var handleDisplayDataFailure = function(error) {
				var localStorage = window.localStorage;

                if(localStorage.getItem('deviceID')) {
                    console.log(localStorage.getItem('deviceID'));
                }
                if(window.innerHeight > window.innerWidth){
                    localStorage.setItem('deviceID', 'portrait');
                } else {
                	localStorage.setItem('deviceID', 'landscape');
                }
                console.log("error getting display info");
            }


            Channel.getDisplay().getData()
                .then(handleDisplayDataSuccess)
                .catch(handleDisplayDataFailure);

        }

    });

    // Conditionally disables context menu if debugClientLibs is turned off for "production" environment
    if (!/.*debugClientLibs.*/.test(window.location.search)) {
        $(document).on('MSHoldVisual', false);
        $(document).on('contextmenu', false);
    }
});
