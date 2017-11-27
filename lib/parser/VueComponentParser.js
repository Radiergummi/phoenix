'use strict';

/*
 global module,
 require
 */

const vueDocs = require( 'vue-docgen-api' );

const Parser   = require( './Parser' );

/**
 * @name JSDoc Parser
 * @description Provides a parser that handles JavaScript files and passes them through JSDoc
 *
 * @property {Array}  sources
 * @property {object} _options
 * @extends Parser
 */
class VueComponentParser extends Parser {

  /**
   * accept JavaScript files
   *
   * @param  {string} fileType
   * @return {boolean}
   */
  accepts ( fileType = '' ) {
    return !!fileType.match( /\.vue|vue|vue-component$/i );
  }

  /**
   * invokes the JSDoc parser
   *
   * @return {Promise}
   * @private
   */
  _invoke () {
    return VueComponentParser._parseSources( this.sources, this._options );
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
    return vueDocs.parseSource( source.code, source.name );
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
      .map( source => VueComponentParser._parseSource( source, parserOptions ) );

    return Promise.all( parsedSources );
  }
}

module.exports = VueComponentParser;
