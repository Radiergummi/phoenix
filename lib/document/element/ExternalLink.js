'use strict';

/*
 global module,
 require
 */

const Element = require( './Element' ),
      { URL } = require( 'url' );

const { stringToUrl, urlToString } = require( '../helper/externalUrl' );

/**
 * Provides a link element that can link to external resources. This element works almost identical
 * to the Link element but provides additional convenience methods and a specific URL setter.
 *
 * @property {URL} target
 * @class
 * @extends Element
 * @extends Node
 */
class ExternalLink extends Element {

  /**
   * Creates a new external link element.
   *
   * @param {Element|string} [target]  link target element or element UID
   * @param {*}      args    arguments to the Node constructor
   *
   * @constructor
   */
  constructor ( target, ...args ) {
    super( {}, ...args );

    if ( target ) {
      this.setAttribute( 'target', target );
    }
  }

  /**
   * Sets the target URL
   *
   * @param {string|URL} target
   */
  setTarget ( target ) {

    // check if the passed target is a valid string or URL instance
    if ( !( typeof target === 'string' || target instanceof URL ) ) {
      throw new TypeError( 'Cannot determine link target' );
    }

    this.attributes.target = stringToUrl( target );
  }

  /**
   * Retrieves the target URL
   *
   * @return {URL}
   */
  getTarget () {
    return this.attributes.target;
  }

  /**
   * Retrieves the target URL as a string
   *
   * @return {string}
   */
  toString () {
    return urlToString( this.getAttribute( 'target' ) );
  }
}

/**
 * @type {ExternalLink}
 */
module.exports = ExternalLink;
