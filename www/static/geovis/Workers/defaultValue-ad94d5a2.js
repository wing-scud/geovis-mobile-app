/**
 * Cesium - https://github.com/CesiumGS/cesium
 *
 * Copyright 2011-2020 Cesium Contributors
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
 *
 * Columbus View (Pat. Pend.)
 *
 * Portions licensed separately.
 * See https://github.com/CesiumGS/cesium/blob/master/LICENSE.md for full licensing details.
 */

define(['exports'], function (exports) { 'use strict';

    /**
         * Returns the first parameter if not undefined, otherwise the second parameter.
         * Useful for setting a default value for a parameter.
         *
         *
         * @param {*} a
         * @param {*} b
         * @returns {*} Returns the first parameter if not undefined, otherwise the second parameter.
         *
         * @example
         * param = Cesium.defaultValue(param, 'default');
         */
        function defaultValue(a, b) {
            if (a !== undefined && a !== null) {
                return a;
            }
            return b;
        }

        /**
         * A frozen empty object that can be used as the default value for options passed as
         * an object literal.
         * @type {Object}
         */
        defaultValue.EMPTY_OBJECT = Object.freeze({});

    exports.defaultValue = defaultValue;

});
//## =defaultValue-ad94d5a2.js.map
