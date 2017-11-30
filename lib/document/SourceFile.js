'use strict';

/*
 global module,
 require
 */

const Node = require( './Node' );

/**
 * @name SourceFile
 * @description A source file represents a single entity that holds code. *File* is used as a
 * general term while it could also refer to a database row, a web resource or anything else.
 * Depending on usage, additional subclasses might be created.
 * @extends Node
 * @class
*/
class SourceFile extends Node {

  /**
   * creates a new source file
   *
   * @param {string} name      source entity name
   * @param {string} [content] source entity content
   */
  constructor ( name, content = '' ) {
    super();

    /**
     * holds the file name
     *
     * @type {string}
     */
    this.name = name;

    /**
     * holds the file content
     *
     * @type {string}
     */
    this.content = content;
  }

  /**
   * retrieves the source file name
   *
   * @return {string}
   */
  get name () {
    return this._value.name;
  }

  /**
   * sets the source file name
   *
   * @param {string} newName
   */
  set name ( newName ) {
    this._value.name = newName;
  }

  /**
   * retrieves the file content
   *
   * @return {string}
   */
  get content () {
    return this._value.content;
  }

  /**
   * sets the file content
   *
   * @param {string} newContent
   */
  set content ( newContent ) {
    this._value.content = newContent;
  }
}

/**
 * @type {SourceFile}
 */
module.exports = SourceFile;
