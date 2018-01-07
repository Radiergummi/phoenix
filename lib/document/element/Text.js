'use strict';

/*
 global module,
 require
 */

const VoidElement = require( './VoidElement' );

/**
 * Provides a node containing plain text only
 *
 * @property {string} content text content
 *
 * @class
 * @extends VoidElement
 * @extends Element
 * @extends Node
 */
class Text extends VoidElement {

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
    this.setAttribute( 'content', this.getAttribute( 'content' ) + String( text ) );
  }

  /**
   * Replaces the content with new text.
   *
   * @param {string} text new content text
   */
  replaceText ( text = '' ) {
    this.setAttribute( 'content', String( text ) );
  }

  /**
   * Retrieves the content string length
   *
   * @return {number}
   */
  get length () {
    return this.getAttribute( 'content' ).length;
  }

  /**
   * Retrieves the text content
   *
   * @return {string}
   */
  get nodeValue () {
    return this.getAttribute( 'content' );
  }

  // noinspection JSCheckFunctionSignatures
  /**
   * Sets the text content
   *
   * @param {string} newText
   */
  set nodeValue ( newText ) {
    this.setAttribute( 'content', newText );
  }

  /**
   * Retrieves the text content
   *
   * @return {string}
   */
  get textContent () {
    return this.getAttribute( 'content' );
  }

  // noinspection JSCheckFunctionSignatures
  /**
   * Sets the text content
   *
   * @param {string} newText
   */
  set textContent ( newText ) {
    this.setAttribute( 'content', newText );
  }
}

/**
 * @type {Text}
 */
module.exports = Text;
