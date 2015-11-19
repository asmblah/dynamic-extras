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

ShowBehaviour.prototype.handle = function ($element, options) {
    var $target = options.select('show'),
        alsoEnable = options.get('enable', 'no') === 'yes';

    $target.removeClass('hide');

    // Sometimes it can be useful to also enable an element when showing:
    // for example, to re-allow form elements to be included in POST data.
    if (alsoEnable) {
        $target.find(':input').andSelf().removeAttr('disabled');
    }
};

module.exports = ShowBehaviour;
