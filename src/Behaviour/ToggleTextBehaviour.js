/*
 * Dynamic Extras - Additional behaviours for the Dynamic JS library
 * Copyright (c) Dan Phillimore (asmblah)
 * https://github.com/asmblah/dynamic-extras
 *
 * Released under the MIT license
 * https://github.com/asmblah/dynamic-extras/raw/master/MIT-LICENSE.txt
 */

'use strict';

var DATA_NAME = 'dynamic.js.toggle.text.is_toggled',
    undef;

function ToggleTextBehaviour() {

}

ToggleTextBehaviour.prototype.handle = function ($element, options) {
    var $target = options.select('of', $element),
        toggleText = options.get('to');

    if ($target.data(DATA_NAME) !== undef) {
        // Restore the original text
        $target.text($target.data(DATA_NAME));
        $target.removeData(DATA_NAME);
    } else {
        // Store the original text for later restore
        $target.data(DATA_NAME, $target.text());
        $target.text(toggleText);
    }
};

module.exports = ToggleTextBehaviour;
