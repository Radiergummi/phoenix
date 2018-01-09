'use strict';

/*
 global module,
 require
 */

const Table = require( '../Table' ),
      Node  = require( '../../Node' );

/**
 * Table cell element
 *
 * @class
 * @extends Element
 * @extends Node
 */
class TableCell extends Table {

  /**
   * Table cells may hold any node type, therefore, we use the default Node constructor
   *
   * @return {Node}
   */
  static get permittedChildrenNodeType () {
    return Node;
  }
}

module.exports = TableCell;
