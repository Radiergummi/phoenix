'use strict';

/*
 global module,
 require,
 exports,
 describe,
 it
 */

const expect = require( 'chai' ).expect;

const Element         = require( '../lib/document/element/Element' ),
      TableRow        = require( '../lib/document/element/table/TableRow' ),
      TableColumnRow  = require( '../lib/document/element/table/TableColumnRow' ),
      TableCell       = require( '../lib/document/element/table/TableCell' ),
      TableColumnCell = require( '../lib/document/element/table/TableColumnCell' );

describe( 'Table column row elements', () => {
  it( 'Should inherit from TableRow', () => {
    expect( TableRow.isPrototypeOf( TableColumnRow ) ).to.be.true;
  } );

  it( 'Should only permit table column cells as child nodes', () => {
    expect( TableColumnRow ).to.have.property( 'permittedChildrenNodeType', TableColumnCell );
  } );

  it( 'Should append table column cells', () => {
    const element = new TableColumnRow,
          cell    = new TableColumnCell;

    element.appendChild( cell );

    expect( element.firstChild ).to.equal( cell );
  } );

  it( 'Should bail on appending table cells', () => {
    const element = new TableColumnRow,
          cell    = new TableCell;

    // noinspection JSCheckFunctionSignatures
    expect( () => element.appendChild( cell ) ).to.throw( TypeError );
  } );

  it( 'Should bail on appending other elements than table column cells', () => {
    const element = new TableColumnRow,
          cell    = new Element;

    // noinspection JSCheckFunctionSignatures
    expect( () => element.appendChild( cell ) ).to.throw( TypeError );
  } );

  it( 'Should allow creating a column row with children directly', () => {
    const element = TableColumnRow.withColumns( [
      'foo',
      'bar',
      new TableColumnCell( 'baz' )
    ] );

    expect( element.textContent ).to.equal( 'foo\nbar\nbaz' );
  } );
} );
