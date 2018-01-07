'use strict';

/*
 global module,
 require
 */

const { URL } = require( 'url' );

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
 */
module.exports.stringToUrl = function ( url ) {
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
  // because the URL is wrong somehow. Theoretically, this cannot happen. But since I don't know
  // what this library will eventually be used for, let's better make it sound.
  // The following, by the way, is a completely valid URL!
  return new URL( 'invalid://' );
};

/**
 * Converts a URL to string. There is really not much functionality in this, merely a little
 * wrapping going on.
 *
 * @param  {URL|null} url URL instance to convert
 * @return {string}       converted string
 */
module.exports.urlToString = function ( url ) {
  if ( url && typeof url.toString === 'function' ) {
    return url.toString();
  }

  return '';
};
