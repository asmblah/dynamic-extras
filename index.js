/*
 * Dynamic Extras - Additional behaviours for the Dynamic JS library
 * Copyright (c) Dan Phillimore (asmblah)
 * https://github.com/asmblah/dynamic-extras
 *
 * Released under the MIT license
 * https://github.com/asmblah/dynamic-extras/raw/master/MIT-LICENSE.txt
 */

'use strict';

var _ = require('lodash'),
    jsep = require('jsep'),
    CodeGenerator = require('./src/CodeGenerator'),
    ExpressionEvaluator = require('./src/ExpressionEvaluator'),
    HideBehaviour = require('./src/Behaviour/HideBehaviour'),
    SetValueBehaviour = require('./src/Behaviour/SetValueBehaviour'),
    ShowBehaviour = require('./src/Behaviour/ShowBehaviour'),
    ToggleClassBehaviour = require('./src/Behaviour/ToggleClassBehaviour');

module.exports = function (dynamic) {
    var expressionEvaluator = new ExpressionEvaluator(jsep, new CodeGenerator()),
        behaviours = {
            'hide': new HideBehaviour(),
            'set-value': new SetValueBehaviour(expressionEvaluator),
            'show': new ShowBehaviour(),
            'toggle-class': new ToggleClassBehaviour(expressionEvaluator)
        };

    _.each(behaviours, function (behaviour, name) {
        dynamic.addBehaviour(name, _.bind(behaviour.handle, behaviour));
    });
};
