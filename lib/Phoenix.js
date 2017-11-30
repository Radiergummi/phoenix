'use strict';

/*
 global module,
 require
 */

/**
 * Main Phoenix classes
 * @namespace Phoenix
 */

const EventEmitter = require( 'events' ).EventEmitter;
const mergeOptions = require( 'merge-options' ),
      packageJson  = require( '../package.json' );

const Document = require( './document/Document' );

/**
 * It is mainly used by the CLI application but can be easily implemented
 * programmatically: Just `require` this file and create a new instance. Additionally, you can adapt
 * it for your company or project by inheriting and adjusting the default options, if you'd like to.
 * That spares you from having to use a configuration file.
 *
 * @module
 * @extends EventEmitter
 * @class
 */
class Phoenix extends EventEmitter {

  /**
   * @description Initializes the Phoenix base class
   *
   * @param {object} [options] any options you'd normally write in a config file
   *
   * @constructor
   */
  constructor ( options = {} ) {
    super();

    /**
     * Phoenix options
     *
     * @type {object}
     * @private
     */
    this._options = mergeOptions( Phoenix.defaultOptions, options );

    this.emit( 'init', {
      phoenix:  this,
      options:  this._options,
      document: this.document
    } );
  }

  /**
   * starts the documentation build process
   *
   * @return {Promise}
   */
  run () {
    this.emit( 'start', {
      phoenix: this
    } );

    return this.createDocument( this._options.project.name )

      // start reading the origins
      .then( _ => this.read( this._options.origins, this._options ) )

      // start parsing the sources
      .then( sources => this.parse( sources, this._options ) );

    /*      .then( this.transform )
          .then( this.write );
    */
  }

  /**
   * create a new document
   *
   * @param  {string}             title document title
   * @return {Promise.<Document>}       Promise holding the document instance
   */
  createDocument ( title ) {
    this.document = new Document( title );

    return Promise.resolve( this.document );
  }

  /**
   * reads a set of input origins
   *
   * @param  {Array.<string|RegExp>} origins
   * @param  {object}                [options]
   * @return {Promise.<Array>}
   */
  read ( origins, options ) {
    const readers = [];

    for ( let Reader of this._options.readers ) {

      /**
       * create the reader instance and pass the options by class name
       *
       * @type {Reader}
       */
      const reader = new Reader( origins, this.document, options[ Reader.name ] );

      reader.on( 'init', data => this.emit( 'read:init', data ) );
      reader.on( 'before', data => this.emit( 'read:before', data ) );
      reader.on( 'after', data => this.emit( 'read:after', data ) );
      reader.on( 'error', data => this.emit( 'read:error', data ) );

      readers.push( reader );
    }

    return Promise.all( readers.map( reader => reader.read() ) );
  }

  /**
   * parses a set of sources
   *
   * @param  {Array.<string>} sources
   * @param  {object}         [options]
   * @return {Promise.<string[]>}
   */
  parse ( sources, options ) {
    const parsers = [];

    for ( let Parser of this._options.parsers ) {
      const parser = new Parser( sources, this.document, options[ Parser.name ] );

      parser.on( 'init', data => this.emit( 'parse:init', data ) );
      parser.on( 'before', data => this.emit( 'parse:before', data ) );
      parser.on( 'after', data => this.emit( 'parse:after', data ) );
      parser.on( 'error', data => this.emit( 'parse:error', data ) );

      parsers.push( parser );
    }

    return Promise.all( parsers.map( parser => parser.parse() ) );
  }

  transform ( ASTs, document, options ) {
  }

  write ( output, document, options ) {
  }

  /**
   * The default options hold general descriptors and environment variables, but also -- and more
   * importantly -- the module classes. Any configuration file might be directly based on this set
   * of options. To include custom classes, they need to be `require`d here.
   * While passing them as strings would be possible, the explicit instance approach offloads any
   * file resolving to nodes `require`: Exactly what it is for. This also means that any wrong path
   * will inevitably result in an exception thrown that halts the process. This is on purpose - we
   * don't want a pipeline with a missing module to work anyway, since that'll result in faulty
   * documentation output.
   * You can read more on config files, modules, merging syntax and module extensions in the docs.
   *
   * @return {object}
   */
  static get defaultOptions () {
    return {
      project:      {
        name: packageJson.name
      },
      readers:      [
        require( './reader/FileSystemReader' ),
        require( './reader/StdInReader' )
      ],
      parsers:      [
        require( './parser/JSDocParser' )
      ],
      transformers: [
        require( './transformer/HtmlTransformer' ),
        require( './transformer/MarkdownTransformer' )
      ],
      writers:      [
        require( './writer/FileSystemWriter' ),
        require( './writer/StdOutWriter' )
      ]
    };
  }
}

/**
 * @type {Phoenix}
 */
module.exports = Phoenix;
