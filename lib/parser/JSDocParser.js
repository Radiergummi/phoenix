'use strict';

/*
 global module,
 require
 */

const JSDocX       = require( 'jsdoc-x' ),
      mergeOptions = require( 'merge-options' );

const Parser = require( './Parser' );

/**
 * Provides a parser that handles JavaScript files and passes them through JSDoc
 *
 * @property {Array}    sources
 * @property {Document} document
 * @property {object}   _options
 *
 * @class
 * @extends Parser
 */
class JSDocParser extends Parser {
  static get defaultOptions () {
    return mergeOptions( super.constructor.defaultOptions, {

      // accept JavaScript files
      accepts:       /\.js|javascript|js/i,
      JSDocXOptions: {
        debug: false
      }
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
      .then(
        results => results.map( result => JSDocParser._documentSource( this.document, result ) )
      );
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

    // pass the parser options and source code to JSDoc-X, merged into a new object
      .parse( Object.assign( {}, parserOptions, { source: source.code } ) )
      .catch( error => {
        error.message = error.message

          // replace temporary file names with the actual one
          .replace( /([\w\d-./\\]+\.js)/gmi, source.name )

          // trim the message
          .trim();

        throw error;
      } )

      // filter the docs to restore the original path to the files
      .then( docs => JSDocX.filter( docs, {}, symbol => {
        symbol.meta.filename = source.filename ? source.filename : source.name;
        symbol.meta.path     = source.path ? source.path : symbol.meta.path;

        return symbol;
      } ) )
      .then( docs => ({ source, docs }) );
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

  static _documentSource ( document, item ) {
    const page = document.addPage( item.source.name );

    item.docs.forEach( symbol => JSDocParser._createSymbolSection( page, symbol )
    );
  }

  /**
   * create the section for a single symbol
   *
   * @param  {Page}    page    parent page node
   * @param  {object}  symbol  subject symbol to be documented
   * @return {Node}            section reference
   * @private
   */
  static _createSymbolSection ( page, symbol ) {
    console.log( symbol );

    const section = page.addSection( symbol.name );

    // properties should be used as class names, if available
    section.nodeValue.properties = {
      id:     symbol.meta.code.id,
      type:   symbol.kind,
      scope:  symbol.scope,
      origin: {
        source: '', // source node here
        line:   symbol.meta.lineno
      }
    };

    section.nodeValue.content = symbol.description;

    return section;
  }
}

module.exports = JSDocParser;
