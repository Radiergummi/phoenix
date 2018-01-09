'use strict';

/*
 global module,
 require
 */

const Node = require( '../../document/Node' );

/**
 * Describes a documentation entity
 */
class Entity extends Node {

  /**
   * Creates a new Entity
   *
   * @param {string} name
   * @param {string} [content]
   */
  constructor ( name, content = '' ) {
    super( {
      name,
      content
    } );
  }

  /**
   * Retrieves the Entities name
   *
   * @return {string}
   */
  get name () {
    return this._value.name;
  }

  /**
   * Sets the Entities name
   *
   * @param {string} name
   */
  set name ( name ) {
    this._value.name = name;
  }

  /**
   * Retrieves the Entities content
   *
   * @return {string}
   */
  get content () {
    return this._value.content;
  }

  /**
   * Sets the Entities content
   *
   * @param {string} data
   */
  set content ( data ) {
    this._value.content = data;
  }
}

/**
 * @type {Entity}
 */
module.exports = Entity;
