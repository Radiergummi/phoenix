'use strict';

/*
 global module,
 require
 */

const ChildlessElement = require( './ChildlessElement' );

/**
 * Provides a node containing plain text only
 *
 * @property {string} content text content
 *
 * @class
 * @extends ChildlessElement
 * @extends Element
 * @extends Node
 */
class Text extends ChildlessElement {

  /**
   * Creates a new text element.
   *
   * @param {string} [content=''] text content
   * @param {*}      args         arguments to the Node constructor
   * @constructor
   *
   * @constructor
   */
  constructor ( content = '', ...args ) {
    super( {}, ...args );

    this.setAttribute( 'content', content );
  }

  /**
   * Appends text to the content.
   *
   * @param {string} text new text to append
   */
  appendText ( text = '' ) {
    this.content += String( text );
  }

  /**
   * Replaces the content with new text.
   *
   * @param {string} text new content text
   */
  replaceText ( text = '' ) {
    this.content = String( text );
  }

  /**
   * Retrieves the content string length
   *
   * @return {number}
   */
  get length () {
    return this.content.length;
  }

  /**
   * Retrieves the text content
   *
   * @return {string}
   */
  get nodeValue () {
    return this.content;
  }

  // noinspection JSCheckFunctionSignatures
  /**
   * Sets the text content
   *
   * @param {string} newText
   */
  set nodeValue ( newText ) {
    this.content = newText;
  }

  /**
   * Retrieves the text content
   *
   * @return {string}
   */
  get textContent () {
    return this.content;
  }

  // noinspection JSCheckFunctionSignatures
  /**
   * Sets the text content
   *
   * @param {string} newText
   */
  set textContent ( newText ) {
    this.content = newText;
  }
}

/**
 * @type {Text}
 */
module.exports = Text;
