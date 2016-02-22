/*
 * Dynamic Extras - Additional behaviours for the Dynamic JS library
 * Copyright (c) Dan Phillimore (asmblah)
 * https://github.com/asmblah/dynamic-extras
 *
 * Released under the MIT license
 * https://github.com/asmblah/dynamic-extras/raw/master/MIT-LICENSE.txt
 */

'use strict';

function AddClassBehaviour() {

}

AddClassBehaviour.prototype.handle = function ($element, options) {
    var $target = options.select('to'),
        className = options.get('class');

    $target.addClass(className);
};

module.exports = AddClassBehaviour;
