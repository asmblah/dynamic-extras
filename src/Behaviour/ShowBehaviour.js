/*
 * Dynamic Extras - Additional behaviours for the Dynamic JS library
 * Copyright (c) Dan Phillimore (asmblah)
 * https://github.com/asmblah/dynamic-extras
 *
 * Released under the MIT license
 * https://github.com/asmblah/dynamic-extras/raw/master/MIT-LICENSE.txt
 */

'use strict';

function ShowBehaviour() {

}

ShowBehaviour.prototype.handle = function ($element, options, $context) {
    var $target = $context.find(options.get('show'));

    $target.removeClass('hide');
};

module.exports = ShowBehaviour;
