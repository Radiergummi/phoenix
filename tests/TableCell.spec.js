'use strict';

/*
 global module,
 require,
 exports,
 describe,
 it
 */

const { expect } = require('chai');

const Node      = require( '../lib/document/Node' ),
      Table     = require( '../lib/document/element/Table' ),
      TableCell = require( '../lib/document/element/table/TableCell' );

describe( 'Table cell elements', () => {
  it( 'Should inherit from Table', () => {
    expect( Table.isPrototypeOf( TableCell ) ).to.be.true;
  } );

  it( 'Should permit all nodes as child nodes', () => {
    expect( TableCell ).to.have.property( 'permittedChildrenNodeType', false );
  } );

  it( 'Should append nodes', () => {
    const element = new TableCell,
          node    = new Node;

    element.appendChild( node );

    expect( element.hasDescendant( node ) ).to.be.true;
  } );
} );
