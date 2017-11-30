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
 * @extends Documents.Elements.Text
 * @extends Documents.Elements.Element
 * @extends Documents.Node
 * @memberOf Documents.Elements
 */
class Comment extends Text {
}

module.exports = Comment;
