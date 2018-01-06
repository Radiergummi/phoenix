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
   * @param {Element|string} [target]   link target element or element UID
   * @param {*}      args     arguments to the Node constructor
   *
   * @constructor
   */
  constructor ( target, ...args ) {
    super( {}, ...args );

    // set the link target
    this.setTarget( target );
  }

  setTarget ( target ) {
    if ( target instanceof Element ) {
      this.setAttribute( 'target', target );
    }

    // If we have a string, assume it is something the find method can turn into an element.
    // To make sure we can actually find that element, query the root node
    if ( typeof target === 'string' ) {
      const targetElement = this.rootNode.find( target );

      this.setAttribute( 'target', targetElement );
    }

    throw new TypeError( 'Cannot determine link target' );
  }
}

/**
 * @type {Link}
 */
module.exports = Link;
