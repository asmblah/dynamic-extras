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

function ToggleClassBehaviour(expressionEvaluator) {
    this.expressionEvaluator = expressionEvaluator;
}

ToggleClassBehaviour.prototype.handle = function ($element, options, $context, $) {
    var $target = $context.find(options.get('of')),
        className = options.get('class'),
        classNameExpression;

    if (typeof className === 'undefined') {
        classNameExpression = options.get('class-expr');

        if (typeof classNameExpression === 'undefined') {
            throw new Error('Neither "class" nor "class-expr" options were specified for ' + JSON.stringify(options));
        }

        className = this.expressionEvaluator.evaluate(classNameExpression, {$: $});
    }

    if ($target.data(DATA_NAME) && $target.data(DATA_NAME) !== className) {
        $target.toggleClass($target.data(DATA_NAME));
    }

    $target.toggleClass(className);
    $target.data(DATA_NAME, className);
};

module.exports = ToggleClassBehaviour;
