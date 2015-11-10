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
    ToggleClassBehaviour = require('../../../src/Behaviour/ToggleClassBehaviour');

describe('ToggleClassBehaviour', function () {
    beforeEach(function () {
        this.$html = $('<html></html>');
        this.$body = $('<body></body>').appendTo(this.$html);

        this.behaviour = new ToggleClassBehaviour();
    });

    describe('handle()', function () {
        beforeEach(function () {
            this.$element = $('<button>Actuator</button>').appendTo(this.$body);
            this.$target = $('<input id="my_target">').appendTo(this.$body);
            this.options = {
                get: sinon.stub(),
                select: sinon.stub()
            };
            this.$context = this.$html;

            this.callHandle = function () {
                this.behaviour.handle(this.$element, this.options, this.$context, $);
            }.bind(this);
        });

        describe('when the class name to toggle is a constant/immediate string', function () {
            it('should add the class when not present', function () {
                this.options.select.withArgs('of').returns(this.$target);
                this.options.get.withArgs('class').returns('my_class');

                this.callHandle();

                expect(this.$target.hasClass('my_class')).to.be.true;
            });

            it('should remove the class when present', function () {
                this.options.select.withArgs('of').returns(this.$target);
                this.options.get.withArgs('class').returns('my_class');
                this.$target.addClass('my_class');

                this.callHandle();

                expect(this.$target.hasClass('my_class')).to.be.false;
            });

            it('should remove the class when present on the second handle', function () {
                this.options.select.withArgs('of').returns(this.$target);
                this.options.get.withArgs('class').returns('my_class');

                this.callHandle(); // Add the class
                this.callHandle(); // Remove the class again

                expect(this.$target.hasClass('my_class')).to.be.false;
            });

            it('should remove a previously toggled-in class on the second handle', function () {
                this.options.select.withArgs('of').returns(this.$target);

                this.options.get.withArgs('class').returns('my_class_1');
                this.callHandle();
                this.options.get.withArgs('class').returns('my_class_2');
                this.callHandle();

                expect(this.$target.hasClass('my_class_1')).to.be.false;
            });

            it('should add the previously toggled-out class on the second handle', function () {
                this.options.select.withArgs('of').returns(this.$target);
                this.$target.addClass('my_class_1');

                this.options.get.withArgs('class').returns('my_class_1');
                this.callHandle();
                this.options.get.withArgs('class').returns('my_class_2');
                this.callHandle();

                expect(this.$target.hasClass('my_class_1')).to.be.true;
            });
        });
    });
});
