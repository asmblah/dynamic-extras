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

function ToggleTextBehaviour(expressionEvaluator) {
    this.expressionEvaluator = expressionEvaluator;
}

ToggleTextBehaviour.prototype.handle = function ($element, options, $context, $) {
    var $target = options.get('of') ? $context.find(options.get('of')) : $element,
        toggleText = options.get('to'),
        toggleTextExpression;

    if (toggleText === undef) {
        toggleTextExpression = options.get('to-expr');

        if (toggleTextExpression === undef) {
            throw new Error('Neither "to" nor "to-expr" options were specified for ' + JSON.stringify(options));
        }

        toggleText = this.expressionEvaluator.evaluate(toggleTextExpression, {$: $});
    }

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
