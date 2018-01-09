'use strict';

/*
 global module,
 require
 */

const Table = require( '../Table' ),
      Text  = require( '../Text' ),
      Node  = require( '../../Node' );

/**
 * Table cell element
 *
 * @method appendChild(Node)
 * @class
 * @extends Element
 * @extends Node
 */
class TableCell extends Table {
  constructor ( content = '', ...args ) {
    super( {}, ...args );

    if ( typeof content === 'string' ) {
      // noinspection JSCheckFunctionSignatures
      this.appendChild( new Text( content ) );
    }

    if ( content instanceof Node ) {
      // noinspection JSCheckFunctionSignatures
      this.appendChild( content );
    }
  }

  /**
   * Table cells may hold any node type, therefore, we return false to disable the check
   *
   * @return {boolean}
   */
  static get permittedChildrenNodeType () {
    return false;
  }
}

/**
 * @type {TableCell}
 */
module.exports = TableCell;
