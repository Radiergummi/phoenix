'use strict';

/*
 global module,
 require
 */

const JSDocX       = require( 'jsdoc-x' ),
      mergeOptions = require( 'merge-options' );

const Parser = require( './Parser' );

/**
 * @name JSDoc Parser
 * @description Provides a parser that handles JavaScript files and passes them through JSDoc
 *
 * @property {Array}  sources
 * @property {object} _options
 * @extends Parser
 */
class JSDocParser extends Parser {
  static get defaultOptions () {
    return mergeOptions( super.constructor.defaultOptions, {

      // accept JavaScript files
      accepts:       /\.js|javascript|js/i,
      JSDocXOptions: {}
    } );
  }

  /**
   * invokes the JSDoc parser
   *
   * @return {Promise}
   * @private
   */
  _invoke () {
    return JSDocParser
      ._parseSources( this.sources, this._options.JSDocXOptions )
      .then( results => {
        for ( let AST of results ) {
          console.log( `Parsing AST with ${AST.length} nodes` );
        }
      } );
  }

  /**
   * parses a single source
   *
   * @param  {object}          source         source code to parse
   * @param  {object}          parserOptions  parser options
   * @return {Promise.<Array>}                parsed source as an array
   * @private
   */
  static _parseSource ( source, parserOptions ) {
    return JSDocX
      .parse( Object.assign( {}, parserOptions, { source: source.code } ) )
      .catch( error => {
        error.message = error.message

          // replace temporary file names with the actual one
          .replace( /([\w\d-./\\]+\.js)/gmi, source.name )

          // replace the command information
          .replace( /Executed JSDoc Command: [\s\S]*/, '' )

          // trim the message
          .trim();

        throw error;
      } )
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
   * @return {Promise.<Array>}                                   parsed sources
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
