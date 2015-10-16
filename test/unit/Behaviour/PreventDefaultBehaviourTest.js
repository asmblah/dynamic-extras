/*
 * Dynamic Extras - Additional behaviours for the Dynamic JS library
 * Copyright (c) Dan Phillimore (asmblah)
 * https://github.com/asmblah/dynamic-extras
 *
 * Released under the MIT license
 * https://github.com/asmblah/dynamic-extras/raw/master/MIT-LICENSE.txt
 */

'use strict';

var $ = require('jquery'),
    sinon = require('sinon'),
    PreventDefaultBehaviour = require('../../../src/Behaviour/PreventDefaultBehaviour');

describe('PreventDefaultBehaviour', function () {
    beforeEach(function () {
        this.$html = $('<html></html>');
        this.$body = $('<body></body>').appendTo(this.$html);

        this.behaviour = new PreventDefaultBehaviour();
    });

    describe('handle()', function () {
        beforeEach(function () {
            this.$element = $('<button>Actuator</button>').appendTo(this.$body);
            this.$target = $('<input id="my_target">').appendTo(this.$body);
            this.options = {
                get: sinon.stub()
            };
            this.$context = this.$html;
            this.event = $.Event('click');

            this.callHandle = function () {
                this.behaviour.handle(this.$element, this.options, this.$context, $, this.event);
            }.bind(this);
        });

        it('should prevent the default action of the event', function () {
            this.callHandle();

            expect(this.event.isDefaultPrevented()).to.be.true;
        });
    });
});
