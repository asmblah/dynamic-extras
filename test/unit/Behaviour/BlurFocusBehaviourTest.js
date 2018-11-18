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
    BlurFocusBehaviour = require('../../../src/Behaviour/BlurFocusBehaviour');

describe('BlurFocusBehaviour', function () {
    beforeEach(function () {
        this.$html = $('<html></html>');
        this.$body = $('<body></body>').appendTo(this.$html);

        this.behaviour = new BlurFocusBehaviour();
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
            sinon.stub($.fn, 'blur');

            this.callHandle = function () {
                this.behaviour.handle(this.$element, this.options, this.$context, $);
            }.bind(this);
        });

        afterEach(function () {
            $.fn.blur.restore();
        });

        it('should blur the element', function () {
            this.options.select.withArgs('of').returns(this.$target);

            this.callHandle();

            expect($.fn.blur).to.have.been.calledOnce;
            expect($.fn.blur.thisValues[0][0]).to.equal(this.$target[0]);
        });
    });
});
