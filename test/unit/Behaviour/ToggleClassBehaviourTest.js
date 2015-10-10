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
    ToggleClassBehaviour = require('../../../src/Behaviour/ToggleClassBehaviour');

describe('ToggleClassBehaviour', function () {
    beforeEach(function () {
        this.$html = $('<html></html>');
        this.$body = $('<body></body>').appendTo(this.$html);

        this.expressionEvaluator = sinon.createStubInstance(ExpressionEvaluator);

        this.behaviour = new ToggleClassBehaviour(this.expressionEvaluator);
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

        describe('when the class name to toggle is a constant/immediate string', function () {
            it('should add the class when not present', function () {
                this.options.get.withArgs('of').returns('#my_target');
                this.options.get.withArgs('class').returns('my_class');

                this.callHandle();

                expect(this.$target.hasClass('my_class')).to.be.true;
            });

            it('should remove the class when present', function () {
                this.options.get.withArgs('of').returns('#my_target');
                this.options.get.withArgs('class').returns('my_class');
                this.$target.addClass('my_class');

                this.callHandle();

                expect(this.$target.hasClass('my_class')).to.be.false;
            });
        });

        describe('when the class name to toggle is the result of an expression', function () {
            it('should add the class when not present', function () {
                this.options.get.withArgs('of').returns('#my_target');
                this.options.get.withArgs('class-expr').returns('my.expression + 1');
                this.expressionEvaluator.evaluate.withArgs('my.expression + 1').returns('resulting_class');

                this.callHandle();

                expect(this.$target.hasClass('resulting_class')).to.be.true;
            });

            it('should remove the class when present', function () {
                this.options.get.withArgs('of').returns('#my_target');
                this.options.get.withArgs('class-expr').returns('my.expression + 1');
                this.expressionEvaluator.evaluate.withArgs('my.expression + 1').returns('resulting_class');
                this.$target.addClass('resulting_class');

                this.callHandle();

                expect(this.$target.hasClass('resulting_class')).to.be.false;
            });

            it('should remove the class when present on the second handle', function () {
                this.options.get.withArgs('of').returns('#my_target');
                this.options.get.withArgs('class-expr').returns('my.expression + 1');
                this.expressionEvaluator.evaluate.withArgs('my.expression + 1').returns('resulting_class');

                this.callHandle(); // Add the class
                this.callHandle(); // Remove the class again

                expect(this.$target.hasClass('resulting_class')).to.be.false;
            });

            it('should remove a previously toggled-in class on the second handle', function () {
                this.options.get.withArgs('of').returns('#my_target');
                this.options.get.withArgs('class-expr').returns('my.expression + 1');

                this.expressionEvaluator.evaluate.withArgs('my.expression + 1').returns('resulting_class_1');
                this.callHandle();
                this.expressionEvaluator.evaluate.withArgs('my.expression + 1').returns('resulting_class_2');
                this.callHandle();

                expect(this.$target.hasClass('resulting_class_1')).to.be.false;
            });

            it('should add the previously toggled-out class on the second handle', function () {
                this.options.get.withArgs('of').returns('#my_target');
                this.options.get.withArgs('class-expr').returns('my.expression + 1');
                this.$target.addClass('resulting_class_1');

                this.expressionEvaluator.evaluate.withArgs('my.expression + 1').returns('resulting_class_1');
                this.callHandle();
                this.expressionEvaluator.evaluate.withArgs('my.expression + 1').returns('resulting_class_2');
                this.callHandle();

                expect(this.$target.hasClass('resulting_class_1')).to.be.true;
            });

            it('should add jQuery to the expression evaluator context', function () {
                this.options.get.withArgs('of').returns('#my_target');
                this.options.get.withArgs('class-expr').returns('my.expression + 1');

                this.callHandle();

                expect(this.expressionEvaluator.evaluate).to.have.been.calledWith(
                    sinon.match.any,
                    sinon.match({$: $})
                );
            });
        });

        describe('when neither the "class" nor "class-expr" options are present', function () {
            it('should throw the expected error', function () {
                expect(function () {
                    this.callHandle();
                }.bind(this)).to.throw('Neither "class" nor "class-expr" options were specified for {}');
            });
        });
    });
});
