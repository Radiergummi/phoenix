'use strict';

/*
 global module,
 require
 */
const Node    = require( '../Node' ),
      Element = require( './Element' ),
      Text    = require( './Text' );

/**
 * Headings provide a title for a document section. Unlike HTML, headings do not require to specify
 * a level (h1, h2, h3): Depending on their node depth (Node#depth), Transformers are expected to
 * figure out the level by themselves, if the output format requires so.
 * This solves two problems - first, figuring out the heading level is hard without context. You
 * might not know where the element you're building a title for will be inserted, so you end up with
 * a wrong level. Second, the document can be dynamically restructured, without headings loosing
 * their information.
 *
 * You can pass both strings and elements to the Heading constructor - strings will be converted to
 * text elements and either will be attached to the element child nodes.
 *
 * @class
 * @extends Element
 * @extends Node
 */
class Heading extends Element {

  /**
   * creates a new heading element
   *
   * @param {string|Element} content heading text
   * @param {*} args
   */
  constructor ( content = '', ...args ) {
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
 * @type {Heading}
 */
module.exports = Heading;
