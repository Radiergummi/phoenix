'use strict';

/*
 global module,
 require
 */

const Element = require( './Element' );

/**
 * @name Link Element
 * @description Provides a link element that can link to other nodes
 *
 * @extends Element
 * @extends Node
 * @class
 */
class Link extends Element {

  /**
   * Creates a new link element.
   * TODO: The concept for links is not ready yet, so the type might change
   *
   * @param {string} [target] link target Node
   * @param {*}      args     arguments to the Node constructor
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
