'use strict';

/*
 global module,
 require,
 exports,
 describe,
 it
 */

const expect = require( 'chai' ).expect;

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

  it( 'Should append table rows', () => {
    const element = new Table,
          row     = new TableRow;

    element.appendChild( row );

    expect( element.firstChild ).to.equal( row );
  } );

  it( 'Should bail on appending other elements than table rows', () => {
    const element = new Table,
          row     = new Element;

    // noinspection JSCheckFunctionSignatures
    expect( () => element.appendChild( row ) ).to.throw( TypeError );
  } );
} );
