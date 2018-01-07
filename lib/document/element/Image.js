'use strict';

/*
 global module,
 require
 */

const VoidElement = require( './VoidElement' );
const { URL }     = require( 'url' );

const { stringToUrl, urlToString } = require( '../helper/externalUrl' );

/**
 * Provides an image element
 *
 * @extends VoidElement
 * @extends Element
 * @extends Node
 */
class Image extends VoidElement {
  constructor ( source, ...args ) {
    super( {}, ...args );

    if ( source ) {
      this.setAttribute( 'source', source );
    }
  }

  /**
   * Sets the image source
   *
   * @param {URL|string} source
   */
  setSource ( source ) {

    // check if the passed source is a valid string or URL instance
    if ( !( typeof source === 'string' || source instanceof URL ) ) {
      throw new TypeError( 'Cannot determine image source' );
    }

    this.attributes.source = stringToUrl( source );
  }

  /**
   * Retrieves the source URL
   *
   * @return {URL}
   */
  getSource () {
    return this.attributes.source;
  }

  /**
   * Retrieves the source URL as a string
   *
   * @return {string}
   */
  toString () {
    return urlToString( this.getAttribute( 'source' ) );
  }
}

/**
 * @type {Image}
 */
module.exports = Image;
