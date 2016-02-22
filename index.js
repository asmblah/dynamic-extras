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
    AddClassBehaviour = require('./src/Behaviour/AddClassBehaviour'),
    CopyHTMLBehaviour = require('./src/Behaviour/CopyHTMLBehaviour'),
    HideBehaviour = require('./src/Behaviour/HideBehaviour'),
    PreventDefaultBehaviour = require('./src/Behaviour/PreventDefaultBehaviour'),
    RemoveClassBehaviour = require('./src/Behaviour/RemoveClassBehaviour'),
    SetTextBehaviour = require('./src/Behaviour/SetTextBehaviour'),
    SetValueBehaviour = require('./src/Behaviour/SetValueBehaviour'),
    ShowBehaviour = require('./src/Behaviour/ShowBehaviour'),
    ToggleClassBehaviour = require('./src/Behaviour/ToggleClassBehaviour'),
    ToggleTextBehaviour = require('./src/Behaviour/ToggleTextBehaviour');

module.exports = function (dynamic) {
    var behaviours = {
            'add-class': new AddClassBehaviour(),
            'copy-html': new CopyHTMLBehaviour(),
            'hide': new HideBehaviour(),
            'prevent-default': new PreventDefaultBehaviour(),
            'remove-class': new RemoveClassBehaviour(),
            'set-text': new SetTextBehaviour(),
            'set-value': new SetValueBehaviour(),
            'show': new ShowBehaviour(),
            'toggle-class': new ToggleClassBehaviour(),
            'toggle-text': new ToggleTextBehaviour()
        };

    _.each(behaviours, function (behaviour, name) {
        dynamic.addBehaviour(name, _.bind(behaviour.handle, behaviour));
    });
};
