'use strict';

/*
 global module,
 require
 */

const Node = require( '../../document/Node' );

/**
 * Describes a documentation entity container
 */
class Container extends Node {

  /**
   * Creates a new container
   *
   * @param {string} name
   */
  constructor ( name ) {
    super( { name } );
  }

  /**
   * Retrieves the Containers name
   *
   * @return {string}
   */
  get name () {
    return this._value.name;
  }

  /**
   * Sets the Containers name
   *
   * @param {string} name
   */
  set name ( name ) {
    this._value.name = name;
  }
}

/**
 * @type {Container}
 */
module.exports = Container;
