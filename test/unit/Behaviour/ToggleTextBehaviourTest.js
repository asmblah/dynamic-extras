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
    ToggleTextBehaviour = require('../../../src/Behaviour/ToggleTextBehaviour');

describe('ToggleTextBehaviour', function () {
    beforeEach(function () {
        this.$html = $('<html></html>');
        this.$body = $('<body></body>').appendTo(this.$html);

        this.behaviour = new ToggleTextBehaviour();
    });

    describe('handle()', function () {
        beforeEach(function () {
            this.$element = $('<button>I am off</button>').appendTo(this.$body);
            this.$target = $('<span id="my_target">my original text</span>').appendTo(this.$body);
            this.options = {
                get: sinon.stub(),
                select: sinon.stub()
            };
            this.$context = this.$html;

            this.callHandle = function () {
                this.behaviour.handle(this.$element, this.options, this.$context, $);
            }.bind(this);
        });

        describe('when toggling the text of the current element to a constant/immediate string', function () {
            beforeEach(function () {
                this.options.select.withArgs('of').returns(this.$element);
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
                this.options.select.withArgs('of').returns(this.$target);
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
    });
});
