'use strict';

/*
 global module,
 require
 */

const Element = require( './Element' );

/**
 * Provides a link element that can link to other nodes.
 * Links can point to either JavaScript object references (by passing a Node instance) or UID
 * strings. Note, however, that UIDs are always scoped to the document tree containing the link, so
 * you cannot reference a node from a foreign tree by UID since Links resolve UIDs to node instances
 * after setting it. This frees transformer implementations from having to check for invalid links
 * completely.
 * To create links to external resources, please refer to the ExternalLink element which supports
 * URLs as link targets.
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

    // Check if we have a truthy link target before actually setting it. This allows us to define
    // the link later on.
    if ( target ) {

      // Set the link target
      this.setAttribute( 'target', target );
    }
  }

  /**
   * Sets the link target element
   *
   * @param {Element|string} target
   */
  setTarget ( target ) {
    if ( target instanceof Element ) {
      this.attributes.target = target;
    }

    // If we have a string, assume it is something the find method can turn into an element.
    // To make sure we can actually find that element, query the root node
    if ( typeof target === 'string' ) {
      const targetElement = this.rootNode.find( target );

      if ( targetElement ) {
        this.attributes.target = targetElement;
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
    return this.attributes.target;
  }

  showDesc () {
    return {
      props: Object.getOwnPropertyNames( this ),
      name:  this.name
    };
  }
}

/**
 * @type {Link}
 */
module.exports = Link;
