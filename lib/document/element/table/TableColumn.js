'use strict';

/*
 global module,
 require
 */

const TableRow        = require( './TableRow' ),
      TableColumnCell = require( './TableColumnCell' );

/**
 * Table column element.
 *
 * @class
 * @extends Element
 * @extends Node
 */
class TableColumn extends TableRow {
  static get permittedChildrenNodeType () {
    return TableColumnCell;
  }
}

/**
 * @type {TableColumn}
 */
module.exports = TableColumn;
