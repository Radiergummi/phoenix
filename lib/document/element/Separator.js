'use strict';

/*
 global module,
 require
 */

const VoidElement = require( './VoidElement' );

/**
 * Provides a separator element. Separators do exactly and only what their name suggests: They act
 * as a separator between elements, holding no content of their own.
 *
 * @extends VoidElement
 * @extends Element
 * @extends Node
 */
class Separator extends VoidElement {
}

/**
 * @type {Separator}
 */
module.exports = Separator;
