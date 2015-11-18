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
    CopyHTMLBehaviour = require('../../../src/Behaviour/CopyHTMLBehaviour');

describe('CopyHTMLBehaviour', function () {
    beforeEach(function () {
        this.$html = $('<html></html>');
        this.$body = $([
            '<div>',
            '    <script type="text/x-template" id="source"><p>My HTML</p></script>',
            '    <i>A thing</i>',
            '    <div id="target"><h1>My stuff</h1></div>',
            '</div>'
        ].join('\n')).appendTo(this.$html);
        this.$source = this.$body.find('#source');
        this.$target = this.$body.find('#target');

        this.behaviour = new CopyHTMLBehaviour();
    });

    describe('handle()', function () {
        beforeEach(function () {
            this.options = {
                get: sinon.stub(),
                select: sinon.stub()
            };
            this.$context = this.$html;

            this.callHandle = function () {
                this.behaviour.handle(this.$source, this.options, this.$context, $);
            }.bind(this);
        });

        it('should support inserting HTML from one element before another', function () {
            this.options.select.withArgs('of').returns(this.$source);
            this.options.select.withArgs('to').returns(this.$target);
            this.options.get.withArgs('at').returns('beforeBegin');

            this.callHandle();

            expect(this.$html.html()).to.equal([
                '<div>',
                '    <script type="text/x-template" id="source"><p>My HTML</p></script>',
                '    <i>A thing</i>',
                '    <p>My HTML</p><div id="target"><h1>My stuff</h1></div>',
                '</div>'
            ].join('\n'));
        });

        it('should support prepending HTML from one element inside another', function () {
            this.options.select.withArgs('of').returns(this.$source);
            this.options.select.withArgs('to').returns(this.$target);
            this.options.get.withArgs('at').returns('afterBegin');

            this.callHandle();

            expect(this.$html.html()).to.equal([
                '<div>',
                '    <script type="text/x-template" id="source"><p>My HTML</p></script>',
                '    <i>A thing</i>',
                '    <div id="target"><p>My HTML</p><h1>My stuff</h1></div>',
                '</div>'
            ].join('\n'));
        });

        it('should support appending HTML from one element inside another', function () {
            this.options.select.withArgs('of').returns(this.$source);
            this.options.select.withArgs('to').returns(this.$target);
            this.options.get.withArgs('at').returns('beforeEnd');

            this.callHandle();

            expect(this.$html.html()).to.equal([
                '<div>',
                '    <script type="text/x-template" id="source"><p>My HTML</p></script>',
                '    <i>A thing</i>',
                '    <div id="target"><h1>My stuff</h1><p>My HTML</p></div>',
                '</div>'
            ].join('\n'));
        });

        it('should support inserting HTML from one element after another', function () {
            this.options.select.withArgs('of').returns(this.$source);
            this.options.select.withArgs('to').returns(this.$target);
            this.options.get.withArgs('at').returns('afterEnd');

            this.callHandle();

            expect(this.$html.html()).to.equal([
                '<div>',
                '    <script type="text/x-template" id="source"><p>My HTML</p></script>',
                '    <i>A thing</i>',
                '    <div id="target"><h1>My stuff</h1></div><p>My HTML</p>',
                '</div>'
            ].join('\n'));
        });

        it('should append the HTML from an element directly after itself by default', function () {
            this.options.select.withArgs('of', sinon.match.jQuery(this.$source)).returns(this.$source);
            this.options.select.withArgs('to', sinon.match.jQuery(this.$source)).returns(this.$source);

            this.options.get.withArgs('at', 'afterEnd').returns('afterEnd');

            this.callHandle();

            expect(this.$html.html()).to.equal([
                '<div>',
                '    <script type="text/x-template" id="source"><p>My HTML</p></script><p>My HTML</p>',
                '    <i>A thing</i>',
                '    <div id="target"><h1>My stuff</h1></div>',
                '</div>'
            ].join('\n'));
        });

        it('should throw when an invalid destination is specified', function () {
            this.options.select.returns(this.$source);
            this.options.get.withArgs('at', 'afterEnd').returns('anInvalidDestination');

            expect(function () {
                this.callHandle();
            }.bind(this)).to.throw('Dynamic CopyHTMLBehaviour :: Invalid destination "anInvalidDestination"');
        });
    });
});
