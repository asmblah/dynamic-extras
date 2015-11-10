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
    ToggleTextBehaviour = require('../../../src/Behaviour/ToggleTextBehaviour');

describe('ToggleTextBehaviour', function () {
    beforeEach(function () {
        this.$html = $('<html></html>');
        this.$body = $('<body></body>').appendTo(this.$html);

        this.expressionEvaluator = sinon.createStubInstance(ExpressionEvaluator);

        this.behaviour = new ToggleTextBehaviour(this.expressionEvaluator);
    });

    describe('handle()', function () {
        beforeEach(function () {
            this.$element = $('<button>I am off</button>').appendTo(this.$body);
            this.$target = $('<span id="my_target">my original text</span>').appendTo(this.$body);
            this.options = {
                get: sinon.stub()
            };
            this.$context = this.$html;

            this.callHandle = function () {
                this.behaviour.handle(this.$element, this.options, this.$context, $);
            }.bind(this);
        });

        describe('when toggling the text of the current element to a constant/immediate string', function () {
            beforeEach(function () {
                this.options.get.withArgs('of').returns('');
                this.options.get.withArgs('to').returns('I am on');
            });

            it('should set the text of the element', function () {
                this.callHandle();

                expect(this.$element.text()).to.equal('I am on');
            });

            it('should restore the original text on second handle', function () {
                this.callHandle();
                this.callHandle();

                expect(this.$element.text()).to.equal('I am off');
            });

            it('should be able to toggle the text of the element again', function () {
                this.callHandle();
                this.callHandle();
                this.callHandle();

                expect(this.$element.text()).to.equal('I am on');
            });
        });

        describe('when toggling the text of another element to a constant/immediate string', function () {
            beforeEach(function () {
                this.options.get.withArgs('of').returns('#my_target');
                this.options.get.withArgs('to').returns('my expected text');
            });

            it('should set the text of the element', function () {
                this.callHandle();

                expect(this.$target.text()).to.equal('my expected text');
            });

            it('should restore the original text on second handle', function () {
                this.callHandle();
                this.callHandle();

                expect(this.$target.text()).to.equal('my original text');
            });
        });

        describe('when setting the text to the result of an expression', function () {
            beforeEach(function () {
                this.options.get.withArgs('of').returns('#my_target');
                this.options.get.withArgs('to-expr').returns('my.expression + 1');
                this.expressionEvaluator.evaluate.withArgs('my.expression + 1').returns('the result');
            });

            it('should set the text of the element', function () {
                this.callHandle();

                expect(this.$target.text()).to.equal('the result');
            });

            it('should add jQuery to the expression evaluator context', function () {
                this.callHandle();

                expect(this.expressionEvaluator.evaluate).to.have.been.calledWith(
                    sinon.match.any,
                    sinon.match({$: $})
                );
            });

            it('should restore the original text on second handle', function () {
                this.callHandle();
                this.callHandle();

                expect(this.$target.text()).to.equal('my original text');
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
