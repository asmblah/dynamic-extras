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
    SetTextBehaviour = require('../../../src/Behaviour/SetTextBehaviour');

describe('SetTextBehaviour', function () {
    beforeEach(function () {
        this.$html = $('<html></html>');
        this.$body = $('<body></body>').appendTo(this.$html);

        this.behaviour = new SetTextBehaviour();
    });

    describe('handle()', function () {
        beforeEach(function () {
            this.$element = $('<button>Actuator</button>').appendTo(this.$body);
            this.$target = $('<span id="my_target"></span>').appendTo(this.$body);
            this.options = {
                get: sinon.stub(),
                select: sinon.stub()
            };
            this.$context = this.$html;

            this.callHandle = function () {
                this.behaviour.handle(this.$element, this.options, this.$context, $);
            }.bind(this);
        });

        describe('when setting the text to a constant/immediate string', function () {
            it('should set the text of the element', function () {
                this.options.select.withArgs('of').returns(this.$target);
                this.options.get.withArgs('to').returns('my expected text');

                this.callHandle();

                expect(this.$target.text()).to.equal('my expected text');
            });
        });
    });
});
