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
    SetValueBehaviour = require('../../../src/Behaviour/SetValueBehaviour');

describe('SetValueBehaviour', function () {
    beforeEach(function () {
        this.$html = $('<html></html>');
        this.$body = $('<body></body>').appendTo(this.$html);

        this.expressionEvaluator = sinon.createStubInstance(ExpressionEvaluator);

        this.behaviour = new SetValueBehaviour(this.expressionEvaluator);
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

        describe('when setting the value to a constant/immediate string', function () {
            it('should set the value of the field', function () {
                this.options.get.withArgs('of').returns('#my_target');
                this.options.get.withArgs('to').returns('my expected value');

                this.callHandle();

                expect(this.$target.val()).to.equal('my expected value');
            });
        });

        describe('when setting the value to the result of an expression', function () {
            it('should set the value of the field', function () {
                this.options.get.withArgs('of').returns('#my_target');
                this.options.get.withArgs('to-expr').returns('my.expression + 1');
                this.expressionEvaluator.evaluate.withArgs('my.expression + 1').returns('the result');

                this.callHandle();

                expect(this.$target.val()).to.equal('the result');
            });

            it('should add jQuery to the expression evaluator context', function () {
                this.options.get.withArgs('of').returns('#my_target');
                this.options.get.withArgs('to-expr').returns('my.expression + 1');

                this.callHandle();

                expect(this.expressionEvaluator.evaluate).to.have.been.calledWith(
                    sinon.match.any,
                    sinon.match({$: $})
                );
            });
        });

        describe('when neither the "to" nor "to-expr" options are present', function () {
            it('should throw the expected error', function () {
                expect(function () {
                    this.callHandle();
                }.bind(this)).to.throw('Neither "to" nor "to-expr" options were specified for {}');
            });
        });
    });
});
