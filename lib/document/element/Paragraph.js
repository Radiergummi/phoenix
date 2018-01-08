'use strict';

/*
 global module,
 require
 */
const Element = require( './Element' ),
      Node    = require( '../Node' ),
      Text    = require( './Text' );

/**
 * Provides a paragraph element
 *
 * @class
 * @extends Element
 * @extends Node
 */
class Paragraph extends Element {
  constructor ( content, ...args ) {
    super( {}, ...args );

    if ( typeof content === 'string' ) {
      this.appendChild( new Text( content ) );
    }

    if ( content instanceof Node ) {
      this.appendChild( content );
    }
  }
}

/**
 * @type {Paragraph}
 */
module.exports = Paragraph;
