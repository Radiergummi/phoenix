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
   * Creates a new link element. Please note that creating a link with a string target requires the
   * whole document tree to be traversed, so you should use JavaScript references to elements where
   * possible.
   * TODO: The concept for links is not ready yet, so the type might change
   *
   * @param {Element|string} [target] link target element or element UID
   * @param {*}              args     arguments to the Node constructor
   *
   * @constructor
   */
  constructor ( target, ...args ) {
    super( {}, ...args );

    if ( target ) {

      // set the link target
      this.setTarget( target );
    }
  }

  /**
   * Sets the link target element
   *
   * @param {Element|string} target
   */
  setTarget ( target ) {
    if ( target instanceof Element ) {
      this.setAttribute( 'target', target );
    }

    // If we have a string, assume it is something the find method can turn into an element.
    // To make sure we can actually find that element, query the root node
    if ( typeof target === 'string' ) {
      const targetElement = this.rootNode.find( target );

      if ( targetElement ) {
        this.setAttribute( 'target', targetElement );
      }
    }

    if ( !this.hasAttribute( 'target' ) ) {
      throw new TypeError( 'Cannot determine link target' );
    }
  }

  /**
   * Retrieves the target element
   *
   * @return {Element}
   */
  getTarget () {
    return this.getAttribute( 'target' );
  }
}

/**
 * @type {Link}
 */
module.exports = Link;
