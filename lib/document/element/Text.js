'use strict';

/*
 global module,
 require
 */

const TextElement = require( './TextElement' );

/**
 * Provides a node containing plain text only
 *
 * @property {string} content text content
 *
 * @class
 * @extends TextElement
 * @extends Element
 * @extends Node
 */
class Text extends TextElement {

  /**
   * Creates a new text element.
   *
   * @param {string} [content=''] text content
   * @param {*}      args         arguments to the Node constructor
   *
   * @constructor
   */
  constructor ( content = '', ...args ) {
    super( {}, ...args );

    this.textContent = content;
  }

  /**
   * Appends text to the content.
   *
   * @param {string} text new text to append
   */
  appendText ( text = '' ) {
    this.textContent = this.textContent + text;
  }

  /**
   * Replaces the content with new text.
   *
   * @param {string} text new content text
   */
  replaceWith ( text = '' ) {
    this.textContent = String( text );
  }

  /**
   * Retrieves the content string length
   *
   * @return {number}
   */
  get length () {
    return this.textContent.length;
  }

  /**
   * Retrieves the text content
   *
   * @return {string}
   */
  get nodeValue () {
    return this.textContent;
  }

  // noinspection JSCheckFunctionSignatures
  /**
   * Sets the text content
   *
   * @param {string} newText
   */
  set nodeValue ( newText ) {
    this.textContent = newText;
  }
}

/**
 * @type {Text}
 */
module.exports = Text;
