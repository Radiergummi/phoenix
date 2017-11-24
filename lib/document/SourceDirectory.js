'use strict';

/*
 global module,
 require
 */

const Node       = require( './Node' ),
      SourceFile = require( './SourceFile' );

/**
 * @name SourceDirectory
 * @extends Node
 */
class SourceDirectory extends Node {
  constructor ( name = '', childNodes = [] ) {
    super();

    this.name = name;
    childNodes.forEach( node => this.appendChild( node ) );
  }

  /**
   * appends a new source directory to the directory
   *
   * @param {*} args
   */
  addDirectory ( ...args ) {
    this.appendChild( new SourceDirectory( ...args ) );
  }

  /**
   * appends a new source file to the directory
   *
   * @param {*} args
   */
  addFile ( ...args ) {
    this.appendChild( new SourceFile( ...args ) );
  }

  /**
   * retrieves the source directory name
   *
   * @return {string}
   */
  get name () {
    return this._value.name;
  }

  /**
   * sets the source directory name
   *
   * @param {string} newName
   */
  set name ( newName ) {
    this._value.name = newName;
  }
}

/**
 * @type {SourceDirectory}
 */
module.exports = SourceDirectory;
