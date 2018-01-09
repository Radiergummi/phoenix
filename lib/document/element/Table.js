'use strict';

/*
 global module,
 require
 */

const Element = require( './Element' );

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

  /**
   * Holds the permitted children node type for this element.
   * All table elements implement this feature to control which elements can be appended to it.
   * This makes it easier to implement self-validating tables.
   *
   * Directly requiring the element here is necessary because the TableRow element extends
   * Table, so it would result in recursion otherwise. Oh well.
   *
   * @return {TableRow}
   */
  static get permittedChildrenNodeType () {
    return require( './table/TableRow' );
  }

  // noinspection JSCheckFunctionSignatures
  /**
   * Appends a new row to the table. This overwrites the Node#appendChild method on purpose to
   * restrict new children to the permitted node type.
   *
   * @param  {Table} node
   */
  appendChild ( node ) {
    if ( !this.constructor.isValidChildNode( node ) ) {
      throw new TypeError( `Can only append elements of type "${this.constructor.permittedChildrenNodeType.name}" to tables` );
    }

    return super.appendChild( node );
  }

  // noinspection JSCheckFunctionSignatures
  /**
   * Prepends a new row to the table. This overwrites the Node#appendChild method on purpose to
   * restrict new children to the permitted node type.
   *
   * @param {Table} node
   */
  prependChild ( node ) {
    if ( !this.constructor.isValidChildNode( node ) ) {
      throw new TypeError( `Can only prepend elements of type "${this.constructor.permittedChildrenNodeType.name}" to tables` );
    }

    return super.prependChild( node );
  }

  /**
   * checks whether a node may be appended to the table
   *
   * @param {Node} node
   * @return {boolean}
   */
  static isValidChildNode ( node ) {
    return (
      this.permittedChildrenNodeType &&
      node.constructor === this.permittedChildrenNodeType
    );
  }
}

module.exports = Table;
