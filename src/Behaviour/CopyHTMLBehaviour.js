/*
 * Dynamic Extras - Additional behaviours for the Dynamic JS library
 * Copyright (c) Dan Phillimore (asmblah)
 * https://github.com/asmblah/dynamic-extras
 *
 * Released under the MIT license
 * https://github.com/asmblah/dynamic-extras/raw/master/MIT-LICENSE.txt
 */

'use strict';

var destinationMethodMap = {
        'beforeBegin': 'before',
        'afterBegin': 'prepend',
        'beforeEnd': 'append',
        'afterEnd': 'after'
    },
    hasOwn = {}.hasOwnProperty;

function CopyHTMLBehaviour() {

}

CopyHTMLBehaviour.prototype.handle = function ($element, options) {
    var $source = options.select('of', $element),
        $target = options.select('to', $element),
        html,
        destination = options.get('at', 'afterEnd'),
        method;

    if (!hasOwn.call(destinationMethodMap, destination)) {
        throw new Error('Dynamic CopyHTMLBehaviour :: Invalid destination "' + destination + '"');
    }

    html = $source.html();
    method = destinationMethodMap[destination];

    $target[method](html);
};

module.exports = CopyHTMLBehaviour;
