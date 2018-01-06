'use strict';

/*
 global module,
 require
 */

const Element = require( './Element' ),
      { URL } = require( 'url' );

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
   * TODO: The concept for links is not ready yet, so the type might change
   *
   * @param {Element|string} [target]  link target element or element UID
   * @param {*}      args    arguments to the Node constructor
   *
   * @constructor
   */
  constructor ( target = '', ...args ) {
    super( {}, ...args );

    // set the link target
    this.setTarget( target );
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

    this.setAttribute( 'target', this.constructor._stringToUrl( target ) );
  }

  /**
   * Retrieves the target URL
   *
   * @return {URL}
   */
  getTarget () {
    return this.getAttribute( 'target' );
  }

  /**
   * Retrieves the target URL as a string
   *
   * @return {string}
   */
  toString () {
    return this.constructor._urlToString( this.getAttribute( 'target' ) );
  }

  /**
   * Converts a URL to string
   *
   * @param  {URL|null} url URL instance to convert
   * @return {string}       converted string
   * @private
   */
  static _urlToString ( url = null ) {
    if ( url && typeof url.toString === 'function' ) {
      return url.toString();
    }

    return '';
  }

  /**
   * Converts a string to a URL. If a protocol-less URL is provided, "http://" will be prepended as
   * it is a sensible default for external resources. If something entirely unusable is passed (like
   * any primitive except strings or an object), the method will return a URL instance for
   * "invalid://". That is a fallback solution for cases when the actual URL is not known at the
   * time the element is created and should result in valid output links while staying independent
   * of any protocols or hosts you might want to use.
   *
   * @param  {string|URL|null} url URL string to convert
   * @return {URL}                 parsed URL instance
   * @private
   */
  static _stringToUrl ( url = null ) {
    if ( url instanceof URL ) {
      return url;
    }

    if ( typeof url === 'string' ) {
      if ( url.match( /(http)s?:\/\/.+/i ) ) {
        return new URL( url );
      }

      if ( url.length > 0 ) {
        return new URL( `http://${url}` );
      }
    }

    // This is a last resort solution, only to prevent the whole element going up in flames just
    // because we don't know the target URL yet.
    // There *might* be a more elegant solution to this.
    return new URL( 'invalid://' );
  }
}

/**
 * @type {ExternalLink}
 */
module.exports = ExternalLink;
