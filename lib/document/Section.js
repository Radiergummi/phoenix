'use strict';

/*
 global module,
 require
 */

const Node = require( './Node' );

/**
 * @name Section
 * @extends Node
 * @class
*/
class Section extends Node {
  constructor () {
    super();
  }
}

/**
 * @type {Section}
 */
module.exports = Section;
