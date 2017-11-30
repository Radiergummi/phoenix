'use strict';

/*
 global module,
 require
 */

const Element = require( './Element' );

/**
 * Provides a link element that can link to other nodes
 *
 * @class
 * @extends Element
 * @extends Node
 */
class Link extends Element {

  /**
   * Creates a new link element.
   * TODO: The concept for links is not ready yet, so the type might change
   *
   * @param {string} [target] link target Node
   * @param {*}      args     arguments to the Node constructor
   *
   * @constructor
   */
  constructor ( target = '', ...args ) {
    super( {}, ...args );

    // set the link target
    this.setAttribute( 'target', target );
  }
}

/**
 * @type {Link}
 */
module.exports = Link;
