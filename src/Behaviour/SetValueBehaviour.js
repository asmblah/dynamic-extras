/*
 * Dynamic Extras - Additional behaviours for the Dynamic JS library
 * Copyright (c) Dan Phillimore (asmblah)
 * https://github.com/asmblah/dynamic-extras
 *
 * Released under the MIT license
 * https://github.com/asmblah/dynamic-extras/raw/master/MIT-LICENSE.txt
 */

'use strict';

function SetValueBehaviour(expressionEvaluator) {
    this.expressionEvaluator = expressionEvaluator;
}

SetValueBehaviour.prototype.handle = function ($element, options, $context, $) {
    var $target = $context.find(options.get('of')),
        newValue = options.get('to'),
        newValueExpression;

    if (typeof newValue === 'undefined') {
        newValueExpression = options.get('to-expr');

        if (typeof newValueExpression === 'undefined') {
            throw new Error('Neither "to" nor "to-expr" options were specified for ' + JSON.stringify(options));
        }

        newValue = this.expressionEvaluator.evaluate(newValueExpression, {$: $});
    }

    $target.val(newValue);
};

module.exports = SetValueBehaviour;
