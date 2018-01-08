'use strict';

/*
 global module,
 require
 */

const TextElement = require( './TextElement' );

/**
 * Provides a comment element. It inherits from `Text` but won't be included in the `textContent`
 * property.
 *
 * @class
 * @extends Text
 * @extends Element
 * @extends Node
 */
class Comment extends TextElement {
}

module.exports = Comment;
