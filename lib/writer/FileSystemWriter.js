'use strict';

/*
 global module,
 require
 */
const fs   = require( 'fs-extra' ),
      path = require( 'path' );

const Writer      = require( './Writer' );
const objectTypes = require( '../transformer/Transformer' ).types;

/**
 * Writes output documentation to a directory structure
 *
 * @extends Writer
 * @class
*/
class FileSystemWriter extends Writer {

  /**
   * Supported object types for the file system writer
   *
   * @return {Array.<string>}
   */
  get supports () {
    return [
      objectTypes.container,
      objectTypes.containerEmpty,
      objectTypes.object,
      objectTypes.index
    ];
  }

  /**
   *
   * @private
   */
  _invoke () {
    return new Promise( fulfill => {
      const results = [];

      // traverse down the object tree and write all nodes
      this.objects.traverseDown( node => {
        switch ( node.nodeType ) {
          case objectTypes.container:
          case objectTypes.containerEmpty:
            results.push( FileSystemWriter._createDirectory( node.value.path ) );
            break;

          case objectTypes.object:
          case objectTypes.index:
            results.push( FileSystemWriter._writeFile( node.value.path, node.value.content ) );
            break;
        }

        return fulfill( results );
      } );
    } )
      .then( results => Promise.all( results ) );
  }

  /**
   * creates a directory
   *
   * @param  {string}  directoryPath file system path
   * @return {Promise}
   * @private
   */
  static _createDirectory ( directoryPath ) {
    // noinspection JSUnresolvedFunction
    return fs.mkdirs( path.join( this._options.basePath, directoryPath ) );
  }

  /**
   * writes a file
   *
   * @param  {string}  filePath file system path
   * @param  {string}  content  file content
   * @return {Promise}
   * @private
   */
  static _writeFile ( filePath, content ) {
    // noinspection JSUnresolvedFunction
    return fs.writeFile( path.join( this._options.basePath, filePath ), content );
  }

  /**
   * Default file system writer options
   *
   * @return {object}
   */
  static get defaultOptions () {
    return {

      /**
       * Output base path. This will default to the working directory of the current process unless
       * otherwise specified in the writer options.
       *
       * @type {string}
       */
      basePath: process.cwd()
    };
  }
}

module.exports = FileSystemWriter;
