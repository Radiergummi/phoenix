'use strict';

/*
 global module,
 require
 */

const AbstractModule = require( '../AbstractModule' );
const objectTypes    = require( '../transformer/Transformer' ).types;

/**
 * @name Abstract Writer class
 * @description A writer is a class that writes output documentation to a destination.
 *
 * @abstract
 * @class
*/
class Writer extends AbstractModule {

  /**
   * creates a new Writer instance
   *
   * @param {Array}    objects   output documentation
   * @param {Document} document  documentation instance
   * @param {object}   [options] writer options
   */
  constructor ( objects, document, options ) {
    super( options );

    /**
     * holds all output objects
     *
     * @type {Array}
     */
    this.objects = objects;

    /**
     * holds the documentation object
     *
     * @type {Document}
     */
    this.document = document;

    this.emit( 'init', { writer: this } );
  }

  /**
   * writes all objects to a file
   *
   * @return {*}
   */
  write () {
    return this._invoke()
      .then( results => {
        this.emit( 'after', {
          writer:  this,
          results: results
        } );

        return results;
      } )
      .catch( error => this.emit( 'error', {
        writer: this,
        error:  error
      } ) );
  }

  /**
   * Supported object types for the writer. This helps deciding on whether a writer can support all
   * object types passed by a transformer.
   *
   * @return {Array.<string>}
   *
   * @see {Transformer#types}
   */
  get supports () {
    return [
      objectTypes.container,
      objectTypes.containerEmpty,
      objectTypes.object,
      objectTypes.index
    ];
  }
}

module.exports = Writer;
