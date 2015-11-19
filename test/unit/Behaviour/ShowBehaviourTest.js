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
    ShowBehaviour = require('../../../src/Behaviour/ShowBehaviour');

describe('ShowBehaviour', function () {
    beforeEach(function () {
        this.$html = $('<html></html>');
        this.$body = $('<body></body>').appendTo(this.$html);

        this.behaviour = new ShowBehaviour();
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

            this.options.get.withArgs('enable', 'no').returns('no');
            this.options.select.withArgs('show').returns(this.$target);

            this.callHandle = function () {
                this.behaviour.handle(this.$element, this.options, this.$context, $);
            }.bind(this);
        });

        it('should remove the class "hide" from the target element when hidden', function () {
            this.$target.addClass('hide');

            this.callHandle();

            expect(this.$target.hasClass('hide')).to.be.false;
        });

        it('should not add the class "hide" to the target element when already visible', function () {
            this.callHandle();

            expect(this.$target.hasClass('hide')).to.be.false;
        });

        it('should also enable the target element when "enable" option is set', function () {
            this.options.get.withArgs('enable', 'no').returns('yes');
            this.$target.attr('disabled', 'disabled');

            this.callHandle();

            expect(this.$target.is(':enabled')).to.be.true;
        });

        it('should not also enable the target element when "enable" option is not set', function () {
            this.options.get.withArgs('enable', 'no').returns('no');
            this.$target.attr('disabled', 'disabled');

            this.callHandle();

            expect(this.$target.is(':enabled')).to.be.false;
        });
    });
});
