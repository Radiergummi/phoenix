'use strict';

/*
 global module,
 require
 */

const Element  = require( './Element' ),
      TableRow = require( './table/TableRow' );

/**
 * Provides a table element
 *
 * @property {WeakSet} rows holds weak references to all table rows
 *
 * @class
 * @extends Element
 * @extends Node
 */
class Table extends Element {
  constructor ( ...args ) {
    super( ...args );

    this.setAttribute( 'rows', new WeakSet() );
  }

  /**
   * Adds a table row
   *
   * @param {TableRow} row
   */
  addRow ( row ) {
    this.appendChild( row );
    this.rows.add( row );
  }
}

module.exports = Table;
