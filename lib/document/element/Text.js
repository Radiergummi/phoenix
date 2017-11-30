'use strict';

/*
 global module,
 require
 */
const Element = require( './Element' );

/**
 * @name Text
 * @description Provides a node containing plain text only
 *
 * @property {string} content text content
 *
 * @class
 * @extends Documents.Elements.Element
 * @extends Documents.Node
 */
class Text extends Element {

  /**
   * Creates a new text element.
   *
   * @param {string} [content] text content
   * @param {*}      args      arguments to the Node constructor
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

  // noinspection JSCheckFunctionSignatures
  /**
   * Dummy appendChild method
   *
   * @return {null}
   */
  appendChild () {
    return null;
  }

  // noinspection JSCheckFunctionSignatures
  /**
   * Dummy prependChild method
   *
   * @return {null}
   */
  prependChild () {
    return null;
  }

  // noinspection JSCheckFunctionSignatures
  /**
   * Dummy removeChild method
   *
   * @return {null}
   */
  removeChild () {
    return null;
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
}

/**
 * @type {Text}
 */
module.exports = Text;
