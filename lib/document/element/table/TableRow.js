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

  /**
   * Shorthand to create all required cells at once
   *
   * @param {Array.<TableCell|string>} [cells]
   */  static withCells ( cells = [] ) {
    const column = new TableRow();

    for ( let cell of cells ) {
      column.appendChild( cell instanceof TableCell
        ? cell
        : new TableCell( cell )
      );
    }

    return column;
  }
}

/**
 * @type {TableRow}
 */
module.exports = TableRow;
