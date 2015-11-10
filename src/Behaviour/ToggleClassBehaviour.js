/*
 * Dynamic Extras - Additional behaviours for the Dynamic JS library
 * Copyright (c) Dan Phillimore (asmblah)
 * https://github.com/asmblah/dynamic-extras
 *
 * Released under the MIT license
 * https://github.com/asmblah/dynamic-extras/raw/master/MIT-LICENSE.txt
 */

'use strict';

var DATA_NAME = 'dynamic.js.toggle.class.previous';

function ToggleClassBehaviour() {

}

ToggleClassBehaviour.prototype.handle = function ($element, options) {
    var $target = options.select('of'),
        className = options.get('class');

    if ($target.data(DATA_NAME) && $target.data(DATA_NAME) !== className) {
        $target.toggleClass($target.data(DATA_NAME));
    }

    $target.toggleClass(className);
    $target.data(DATA_NAME, className);
};

module.exports = ToggleClassBehaviour;
