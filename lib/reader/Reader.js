'use strict';

/*
 global module,
 require
 */

/**
 * Holds all Readers
 *
 * @namespace Readers
 */

const AbstractModule = require( '../AbstractModule' ),
      SourceFile     = require( '../document/SourceFile' );

/**
 * A reader is a class that reads input origins and provides them as strings. Simple as that.
 *
 * @property {string|Array} origins source origins
 * @abstract
 * @class
 * @extends AbstractModule
 * @memberOf Readers
 */
class Reader extends AbstractModule {

  /**
   * creates a new Reader instance
   *
   * @param {string|Array} origins   source origins
   * @param {Document}     document  document instance
   * @param {object}       [options] reader options. these will be merged with the defaults
   *
   * @constructor
   */
  constructor ( origins, document, options = {} ) {
    super( options );

    /**
     * holds the source origin(s)
     *
     * @type {string|Array}
     */
    this.origins = origins;

    /**
     * holds the documentation object
     *
     * @type {Document}
     */
    this.document = document;

    this.emit( 'init', { reader: this } );
  }

  /**
   * Reads origin data sources and returns an object that maps identifiers to source code. For the
   * FileSystemReader, that means filesystem path mapped to the file content.
   *
   * @return {Promise.<Array>}
   */
  read () {
    this.emit( 'before', { reader: this } );

    // This is why it is important for readers to return a promise: All error handling is performed
    // in the base class to prevent implementations from having to emit events or handle errors.
    return this._invoke()
      .then( results => {
        for ( let file in results ) {
          if ( results.hasOwnProperty( file ) ) {
            this.addSourceFile( file, results[ file ] );
          }
        }

        this.emit( 'after', {
          reader:  this,
          results: results
        } );

        return results;
      } )
      .catch( error => this.emit( 'error', {
        reader: this,
        error:  error
      } ) );
  }

  addSourceFile ( name, content = '' ) {
    this.document.sources.appendChild( new SourceFile( name, content ) );
  }
}

module.exports = Reader;
