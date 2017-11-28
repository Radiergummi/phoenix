'use strict';

/*
 global module,
 require
 */

const Document = require( '../document/Document' );

const AbstractModule = require( '../AbstractModule' );

/**
 * @name Abstract Parser class
 * @description A parser is a class that takes a source file string as its input and parses it to a
 * structured object as its output. This is the core of the project, actually - where the magic
 * happens, so to speak. You might plug anything in here, most obviously something like
 * [Babylon](https://github.com/babel/babel/tree/master/packages/babylon), that parses a file and
 * returns an AST.
 *
 * @abstract
 */
class Parser extends AbstractModule {

  /**
   * Creates a new parser instance
   *
   * @param {Array}  sources   source code to parse
   * @param {object} [options] options for the parser
   */
  constructor ( sources, options = {} ) {
    super( options );

    /**
     * holds the sources
     *
     * @type {string}
     */
    this.sources = sources

    // flatten the source list
      .reduce( ( all, current ) => all.concat( current ), [] )

      // filter the sources by the accept callback
      .filter( source => this.accepts( source.name ) );

    this.emit( 'init', { parser: this } );
  }

  /**
   * parse the provided source
   *
   * @return {Promise.<Array>}
   */
  parse () {
    this.emit( 'before', { parser: this } );

    return this._invoke()
      .then( results => {
        this.emit( 'after', {
          parser:  this,
          results: results
        } );

        return results;
      } )
      .catch( error => this.emit( 'error', {
        parser: this,
        error:  error
      } ) );
  }

  // noinspection JSMethodCanBeStatic, JSUnusedLocalSymbols
  /**
   * Provides information about which type of input source this Parser accepts. By default, this
   * method returns true for any type, thereby accepting every file passed to it. Parsers should
   * check the fileType to decide whether to process the file.
   * This is helpful for mixed type projects: Consider something containing .js, .jsx and .php files
   * that should be individually processed. For each of those types, an individual parser will parse
   * the corresponding files in parallel.
   *
   * @param  {string}  type the source type. This will be the `name` property of a source
   * @return {boolean}
   */
  accepts ( type = '' ) {
    return true;
  }

  static get Document () {
    return Document;
  }
}

module.exports = Parser;
