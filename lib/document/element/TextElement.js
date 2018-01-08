'use strict';

/*
 global module,
 require
 */

const Node = require( '../Node' );

/**
 * Provides a document element that can be populated with text only.
 *
 * @class
 * @extends Node
 */
class TextElement extends Node {

  /**
   * Creates a new text element
   *
   * @param {*} args passes all args to the Node constructor
   * @see Node#constructor
   *
   * @constructor
   */
  constructor ( ...args ) {
    super( ...args );
  }

  /**
   * Retrieves the element name
   *
   * @return {string}
   */
  get name () {
    return this.constructor.name;
  }

  /**
   * Retrieves the node content by joining all children text elements with a line break
   *
   * @return {string}
   */
  get textContent () {
    return this._value.content;
  }

  /**
   * Sets the node text content. This will append a single text node to the element.
   *
   * @param {string} newContent
   */
  set textContent ( newContent ) {
    this._value.content = String( newContent );
  }

  /**
   * appends text to the text content
   *
   * @param {string} newText
   */
  appendText ( newText ) {
    this.textContent = this.textContent + newText;
  }

  /**
   * Delete an amount of characters, starting at the offset. Passing no arguments, this will delete
   * the whole text content.
   *
   * @param {number} offset Position to start deleting text from. Defaults to the first character
   * @param {number} count  Number of characters to delete. Defaults to the length of the content
   */
  deleteText ( offset = 0, count = this.textContent.length ) {
    return this.replaceText( offset, count, '' );
  }

  /**
   * Insert a string at the specified offset
   *
   * @param {number} offset  Character offset at which to insert
   * @param {string} newText New text to insert
   */
  insertText ( offset, newText ) {
    return [
      this.textContent.slice( 0, offset ), newText,
      this.textContent.slice( offset )
    ].join( '' );
  }

  /**
   * Replaces an amount of characters, starting at the offset. Passing no arguments, this will
   * replace the whole text content
   *
   * @param {number} offset  Position to start replacing text from. Defaults to the first character
   * @param {number} count   Number of characters to replace. Defaults to the length of the content
   * @param {string} newText String with which the range should be replaced
   */
  replaceText ( offset = 0, count = this.textContent.length, newText ) {
    const obsolete = this.textContent.substring( offset, offset + count );

    this.textContent = text.replace( obsolete, newText );
  }

  /**
   * Extracts a range of data from the node
   *
   * @param {number} offset Start offset of substring to extract
   * @param {number} count  Number of characters to extract
   *
   * @return {string} Specified substring. If the sum of offset and count exceeds the length,
   *                  then all characters to the end of the text content are returned.
   */
  substringText ( offset, count ) {
    const extraction = this.textContent.substring( offset, offset + count );

    this.textContent = text.replace( extraction, '' );

    return extraction;
  }

  /**
   * stringifies the element by returning its text content
   *
   * @return {string}
   */
  toString () {
    return this.textContent;
  }
}

/**
 * @type {Element}
 */
module.exports = TextElement;
