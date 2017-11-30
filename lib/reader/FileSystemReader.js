'use strict';

/*
 global module,
 require
 */

const fs   = require( 'fs-extra' ),
      glob = require( 'glob-promise' ),
      path = require( 'path' );

const Reader = require( './Reader' );

/**
 * Provides a Reader that can read paths from the local file system. It supports globbed patterns,
 * supplied as a single glob string or an array of those.
 *
 * @class
 * @extends Readers.Reader
 * @memberOf Readers
 * @see https://github.com/isaacs/node-glob#glob-primer
 */
class FileSystemReader extends Reader {

  /**
   * creates a new file system reader instance
   *
   * @param {Array|string} origins   file system paths to read. this supports `glob` patterns.
   * @param {Document}     document  document instance
   * @param {object}       [options]
   *
   * @constructor
   */
  constructor ( origins, document, options ) {
    super( origins, document, options );

    this.emit( 'read:init', {
      reader: this
    } );
  }

  /**
   * invokes the file system reader
   *
   * @return {Promise.<object>}
   * @private
   */
  _invoke () {

    // instantiate the `files` promise. Due to the reader accepting Arrays and strings, we'll need
    // to perform type checking first.
    let files = Promise.resolve();

    // if origins is a string, we'll take it as the only path
    if ( typeof this.origins === 'string' ) {
      files = FileSystemReader._scanPath( this.origins );
    }

    // if origins is an array, we'll iterate over it
    if ( Array.isArray( this.origins ) ) {
      files = FileSystemReader._scanPaths( this.origins );
    }

    // map the file paths to their content
    return files.then( paths => FileSystemReader._readFiles( paths ) );
  }

  /**
   * scans a path for files or subdirectories
   *
   * @param  {string}          filePath path to scan
   * @return {Promise.<Array>}
   * @private
   */
  static _scanPath ( filePath = '' ) {
    // noinspection SpellCheckingInspection
    return glob( filePath, { nodir: true } );
  }

  /**
   * scans multiple paths for files or subdirectories
   *
   * @param  {Array}           paths origin paths to scan
   * @return {Promise.<Array>}       resolved file paths
   * @private
   */
  static _scanPaths ( paths = [] ) {
    const scannedPaths = paths
      .map( path => FileSystemReader._scanPath( path ) );

    return Promise
      .all( scannedPaths )

      // concatenate all file path arrays
      .then( resolvedPaths => resolvedPaths.reduce( ( all, current ) => all.concat( current ), [] ) )

      // remove duplicates
      .then( resolvedPaths => Array.from( new Set( resolvedPaths ) ) );
  }

  /**
   * reads a single file
   *
   * @param  {string}           filePath filesystem path for the file
   * @return {Promise.<string>}          Promise holding the file content
   * @private
   */
  static _readFile ( filePath ) {
    // noinspection JSUnresolvedFunction
    return fs.readFile( filePath );
  }

  /**
   * reads multiple files
   *
   * @param  {Array}            paths list of file paths to read
   * @return {Promise.<object>}       Promise holding an object that maps file paths to content
   * @private
   */
  static _readFiles ( paths = [] ) {

    // read all paths
    const readPaths = paths.map( filePath => FileSystemReader._readFile( filePath ) );

    return Promise.all( readPaths )

      // reduce the paths into an object
      .then( data => paths.map( ( filePath, index ) => ({
        name:     filePath,
        filename: path.basename( filePath ),
        path:     path.resolve( path.dirname( filePath ) ),
        code:     data[ index ].toString()
      } ) ) );
  }
}

module.exports = FileSystemReader;
