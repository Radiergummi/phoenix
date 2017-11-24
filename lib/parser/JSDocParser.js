'use strict';

/*
 global module,
 require
 */

const JSDocX = require( 'jsdoc-x' ),
      path   = require( 'path' );

const Parser   = require( './Parser' ),
      Document = Parser.Document;

/**
 * @name JSDoc Parser
 * @description Provides a parser that handles JavaScript files and passes them through JSDoc
 *
 * @property {Array}  sources
 * @property {object} _options
 * @extends Parser
 */
class JSDocParser extends Parser {

  /**
   * invokes the JSDoc parser
   *
   * @return {Promise}
   * @private
   */
  _invoke () {
    return JSDocParser._parseSources( this.sources, this._options );
  }

  /**
   * parses a single source
   *
   * @param  {object}        source         source code to parse
   * @param  {object}        parserOptions  parser options
   * @return {Promise.<*[]>}                parsed source as object
   * @private
   */
  static _parseSource ( source, parserOptions ) {
    return JSDocX
      .parse( Object.assign( parserOptions, { source: source.code } ) )
      .then( docs => JSDocX.filter( docs, {}, symbol => {
        symbol.meta.filename = source.filename ? source.filename : source.name;
        symbol.meta.path     = source.path ? source.path : symbol.meta.path;

        return symbol;
      } ) );
  }

  /**
   * parses multiple sources
   *
   * @param {Array.<{name: string, code: string}>} sources       source objects
   * @param {object}                               parserOptions parser options
   * @return {Promise.<*[]>}                                     parsed sources
   * @private
   */
  static _parseSources ( sources, parserOptions ) {
    const parsedSources = sources
      .filter( source => !!source.code )
      .map( source => JSDocParser._parseSource( source, parserOptions ) );

    return Promise.all( parsedSources );
  }
}

module.exports = JSDocParser;
