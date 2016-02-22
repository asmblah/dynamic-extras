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
    RemoveClassBehaviour = require('../../../src/Behaviour/RemoveClassBehaviour');

describe('RemoveClassBehaviour', function () {
    beforeEach(function () {
        this.$html = $('<html></html>');
        this.$body = $('<body></body>').appendTo(this.$html);

        this.behaviour = new RemoveClassBehaviour();
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

        describe('when the class name to add is a constant/immediate string', function () {
            it('should remove the class when present', function () {
                this.options.select.withArgs('of').returns(this.$target);
                this.options.get.withArgs('class').returns('my_class');
                this.$target.addClass('my_class');

                this.callHandle();

                expect(this.$target.hasClass('my_class')).to.be.false;
            });

            it('should not add the class when already not present', function () {
                this.options.select.withArgs('of').returns(this.$target);
                this.options.get.withArgs('class').returns('my_class');

                this.callHandle();

                expect(this.$target.hasClass('my_class')).to.be.false;
            });
        });
    });
});
