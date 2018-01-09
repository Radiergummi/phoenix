'use strict';

/*
 global module,
 require
 */

const Table     = require( '../Table' ),
      TableCell = require( './TableCell' );

/**
 * Table row element
 *
 * @class
 * @extends Element
 * @extends Node
 */
class TableRow extends Table {

  /**
   * Table rows may only hold table cells
   *
   * @return {TableCell}
   */
  static get permittedChildrenNodeType () {
    return TableCell;
  }
}

/**
 * @type {TableRow}
 */
module.exports = TableRow;
