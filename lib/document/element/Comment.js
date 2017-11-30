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
 * @extends Text
 * @extends Element
 * @extends Node
 * @class
 * @memberOf Elements
 */
class Comment extends Text {
}

module.exports = Comment;
