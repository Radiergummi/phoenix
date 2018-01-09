'use strict';

/*
 global module,
 require,
 exports,
 describe,
 it
 */

const { expect } = require( 'chai' );

const Element  = require( '../lib/document/element/Element' ),
      Table    = require( '../lib/document/element/Table' ),
      TableRow = require( '../lib/document/element/table/TableRow' );

describe( 'Table elements', () => {
  it( 'Should inherit from Element', () => {
    expect( Element.isPrototypeOf( Table ) ).to.be.true;
  } );

  it( 'Should only permit table rows as child nodes', () => {
    expect( Table ).to.have.property( 'permittedChildrenNodeType', TableRow );
  } );

  it( 'Should add table rows', () => {
    const element = new Table,
          row1    = new TableRow,
          row2    = new TableRow;

    element.appendChild( row1 );
    element.prependChild( row2 );

    expect( element.firstChild ).to.equal( row2 );
    expect( element.lastChild ).to.equal( row1 );
  } );

  it( 'Should bail on adding other elements than table rows', () => {
    const element = new Table,
          row1    = new Element,
          row2    = new Element;

    // noinspection JSCheckFunctionSignatures
    expect( () => element.appendChild( row1 ) ).to.throw( TypeError );

    // noinspection JSCheckFunctionSignatures
    expect( () => element.prependChild( row2 ) ).to.throw( TypeError );
  } );
} );
