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
    ExpressionEvaluator = require('../../../src/ExpressionEvaluator'),
    HideBehaviour = require('../../../src/Behaviour/HideBehaviour');

describe('HideBehaviour', function () {
    beforeEach(function () {
        this.$html = $('<html></html>');
        this.$body = $('<body></body>').appendTo(this.$html);

        this.expressionEvaluator = sinon.createStubInstance(ExpressionEvaluator);

        this.behaviour = new HideBehaviour();
    });

    describe('handle()', function () {
        beforeEach(function () {
            this.$element = $('<button>Actuator</button>').appendTo(this.$body);
            this.$target = $('<input id="my_target">').appendTo(this.$body);
            this.options = {
                get: sinon.stub()
            };
            this.$context = this.$html;

            this.callHandle = function () {
                this.behaviour.handle(this.$element, this.options, this.$context, $);
            }.bind(this);
        });

        it('should add the class "hide" to the target element when not yet hidden', function () {
            this.options.get.withArgs('hide').returns('#my_target');
            this.callHandle();

            expect(this.$target.hasClass('hide')).to.be.true;
        });

        it('should not remove the class "hide" from the target element when already hidden', function () {
            this.options.get.withArgs('hide').returns('#my_target');
            this.$target.addClass('hide');

            this.callHandle();

            expect(this.$target.hasClass('hide')).to.be.true;
        });
    });
});
