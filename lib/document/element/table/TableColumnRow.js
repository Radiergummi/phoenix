'use strict';

/*
 global module,
 require
 */

const TableRow        = require( './TableRow' ),
      TableColumnCell = require( './TableColumnCell' ),
      Text            = require( '../Text' );

/**
 * Table column element.
 *
 * @class
 * @extends Element
 * @extends Node
 */
class TableColumnRow extends TableRow {
  static get permittedChildrenNodeType () {
    return TableColumnCell;
  }

  /**
   * Shorthand to create all required columns at once
   *
   * @param {Array.<TableColumnCell|string>} [cells]
   */
  static withColumns ( cells = [] ) {
    const column = new TableColumnRow();

    for ( let cell of cells ) {
      column.appendChild( cell instanceof TableColumnCell
        ? cell
        : new TableColumnCell( cell )
      );
    }

    return column;
  }
}

/**
 * @type {TableColumnRow}
 */
module.exports = TableColumnRow;
