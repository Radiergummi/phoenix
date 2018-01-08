'use strict';

/*
 global module,
 require
 */

const Element = require( './Element' );

/**
 * Provides a document element that can be populated with text and attributes only. This
 * is the most basic building block of documentation items and the prototype of all other document
 * elements without children nodes.
 *
 * @class
 * @extends Element
 * @extends Node
 */
class VoidElement extends Element {

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
}

/**
 * @type {VoidElement}
 */
module.exports = VoidElement;
