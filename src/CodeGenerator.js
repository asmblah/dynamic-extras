/*
 * Dynamic Extras - Additional behaviours for the Dynamic JS library
 * Copyright (c) Dan Phillimore (asmblah)
 * https://github.com/asmblah/dynamic-extras
 *
 * Released under the MIT license
 * https://github.com/asmblah/dynamic-extras/raw/master/MIT-LICENSE.txt
 */

'use strict';

function CodeGenerator() {

}

CodeGenerator.prototype.generate = function (ast) {
    function generateFrom(node, parent) {
        var args;

        if (node.type === 'BinaryExpression') {
            return '(' +
                generateFrom(node.left, node) + ' ' +
                node.operator + ' ' +
                generateFrom(node.right, node) +
                ')';
        }

        if (node.type === 'CallExpression') {
            args = node.arguments.map(function (argNode) {
                return generateFrom(argNode, node);
            });

            return generateFrom(node.callee, node) + '(' + args.join(', ') + ')';
        }

        if (node.type === 'UnaryExpression') {
            return node.operator + generateFrom(node.argument, node);
        }

        if (node.type === 'MemberExpression' && node.computed) {
            return generateFrom(node.object, node) + '[' + generateFrom(node.property, node) + ']';
        }

        if (node.type === 'MemberExpression' && !node.computed) {
            return generateFrom(node.object, node) + '.' + generateFrom(node.property, node);
        }

        if (node.type === 'ArrayExpression') {
            return '[' +
                node.elements.map(function (elementNode) {
                    return generateFrom(elementNode, node);
                }).join(',') +
                ']';
        }

        if (node.type === 'Literal') {
            return node.raw;
        }

        if (node.type === 'Identifier') {
            if (parent.type !== 'MemberExpression') {
                return 'context.' + node.name;
            }

            return node.name;
        }
    }

    return generateFrom(ast);
};

module.exports = CodeGenerator;
