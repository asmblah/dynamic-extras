/*
 * Dynamic Extras - Additional behaviours for the Dynamic JS library
 * Copyright (c) Dan Phillimore (asmblah)
 * https://github.com/asmblah/dynamic-extras
 *
 * Released under the MIT license
 * https://github.com/asmblah/dynamic-extras/raw/master/MIT-LICENSE.txt
 */

'use strict';

function HideBehaviour() {

}

HideBehaviour.prototype.handle = function ($element, options) {
    var $target = options.select('hide'),
        alsoDisable = options.get('disable', 'no') === 'yes';

    $target.addClass('hide');

    // Sometimes it can be useful to also disable an element when hiding:
    // for example, to prevent form elements from being included in POST data.
    if (alsoDisable) {
        $target.attr('disabled', 'disabled');
    }
};

module.exports = HideBehaviour;
