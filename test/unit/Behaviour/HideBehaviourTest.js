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
    HideBehaviour = require('../../../src/Behaviour/HideBehaviour');

describe('HideBehaviour', function () {
    beforeEach(function () {
        this.$html = $('<html></html>');
        this.$body = $('<body></body>').appendTo(this.$html);

        this.behaviour = new HideBehaviour();
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

            this.options.get.withArgs('disable', 'no').returns('no');

            this.callHandle = function () {
                this.behaviour.handle(this.$element, this.options, this.$context, $);
            }.bind(this);
        });

        it('should add the class "hide" to the target element when not yet hidden', function () {
            this.options.select.withArgs('hide').returns(this.$target);

            this.callHandle();

            expect(this.$target.hasClass('hide')).to.be.true;
        });

        it('should not remove the class "hide" from the target element when already hidden', function () {
            this.options.select.withArgs('hide').returns(this.$target);
            this.$target.addClass('hide');

            this.callHandle();

            expect(this.$target.hasClass('hide')).to.be.true;
        });

        describe('when "disable" option is set', function () {
            it('should also disable the target element', function () {
                this.options.select.withArgs('hide').returns(this.$target);
                this.options.get.withArgs('disable', 'no').returns('yes');

                this.callHandle();

                expect(this.$target.is(':disabled')).to.be.true;
            });

            it('should also disable descendant elements of the target element', function () {
                this.$target = $('<div><input id="field"></div>');
                this.options.select.withArgs('hide').returns(this.$target);
                this.$field = this.$target.find('#field');
                this.options.get.withArgs('disable', 'no').returns('yes');

                this.callHandle();

                expect(this.$field.is(':disabled')).to.be.true;
            });
        });

        describe('when "disable" option is not set', function () {
            it('should not also disable the target element', function () {
                this.options.select.withArgs('hide').returns(this.$target);
                this.options.get.withArgs('disable', 'no').returns('no');

                this.callHandle();

                expect(this.$target.is(':disabled')).to.be.false;
            });

            it('should not also disable descendant elements of the target element', function () {
                this.$target = $('<div><input id="field"></div>');
                this.options.select.withArgs('hide').returns(this.$target);
                this.$field = this.$target.find('#field');
                this.options.get.withArgs('disable', 'no').returns('no');

                this.callHandle();

                expect(this.$field.is(':disabled')).to.be.false;
            });
        });
    });
});
