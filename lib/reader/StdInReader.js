'use strict';

/*
 global module,
 require
 */

const Reader = require( './Reader' );

/**
 * Provides a Reader that can read string input from the standard input stream (STDIN).
 *
 * TODO: The Reader needs additional work and testing!
 *
 * @see https://nodejs.org/api/readline.html
 * @class
 * @extends Readers.Reader
 * @memberOf Readers
 */
class StdInReader extends Reader {

  // noinspection JSUnusedLocalSymbols
  /**
   * creates a new file system reader instance
   *
   * @param {*}        _         unused
   * @param {Document} document  document instance
   * @param {object}   [options]
   *
   * @constructor
   */
  constructor ( _, document, options ) {
    super( '', document, options );
  }

  /**
   * invokes the file system reader
   *
   * @return {Promise.<object>}
   * @private
   */
  _invoke () {
    return this._readInputStream();
  }

  /**
   * reads the STDIN stream
   *
   * @return {Promise.<String>}
   * @private
   */
  _readInputStream () {
    let input = '',
        stdin = process.stdin;

    return new Promise( resolve => {
      if ( stdin.isTTY ) {
        return resolve( input );
      }

      // noinspection JSUnresolvedFunction
      stdin.setEncoding( 'utf8' );

      stdin.on( 'readable', () => {
        let chunk;

        while ( (chunk = stdin.read()) ) {
          input += chunk;
        }
      } );

      stdin.on( 'end', _ => resolve( input ) );
    } );
  }
}

module.exports = StdInReader;
