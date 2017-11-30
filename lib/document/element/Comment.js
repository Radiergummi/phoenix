'use strict';

/*
 global module,
 require
 */

const Text = require( './Text' );

/**
 * Provides a comment element. It inherits from `Text` but won't be included in the `textContent`
 * property.
 *
 * @class
 * @extends Text
 * @extends Element
 * @extends Node
 */
class Comment extends Text {
}

module.exports = Comment;
