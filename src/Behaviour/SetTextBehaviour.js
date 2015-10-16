/*
 * Dynamic Extras - Additional behaviours for the Dynamic JS library
 * Copyright (c) Dan Phillimore (asmblah)
 * https://github.com/asmblah/dynamic-extras
 *
 * Released under the MIT license
 * https://github.com/asmblah/dynamic-extras/raw/master/MIT-LICENSE.txt
 */

'use strict';

function SetTextBehaviour(expressionEvaluator) {
    this.expressionEvaluator = expressionEvaluator;
}

SetTextBehaviour.prototype.handle = function ($element, options, $context, $) {
    var $target = $context.find(options.get('of')),
        newText = options.get('to'),
        newTextExpression;

    if (typeof newText === 'undefined') {
        newTextExpression = options.get('to-expr');

        if (typeof newTextExpression === 'undefined') {
            throw new Error('Neither "to" nor "to-expr" options were specified for ' + JSON.stringify(options));
        }

        newText = this.expressionEvaluator.evaluate(newTextExpression, {$: $});
    }

    $target.text(newText);
};

module.exports = SetTextBehaviour;
