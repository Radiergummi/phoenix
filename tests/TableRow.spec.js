'use strict';

/*
 global module,
 require,
 exports,
 describe,
 it
 */

const { expect } = require('chai');

const Element         = require( '../lib/document/element/Element' ),
      Table           = require( '../lib/document/element/Table' ),
      TableRow        = require( '../lib/document/element/table/TableRow' ),
      TableCell       = require( '../lib/document/element/table/TableCell' ),
      TableColumnCell = require( '../lib/document/element/table/TableColumnCell' );

describe( 'Table row elements', () => {
  it( 'Should inherit from Table', () => {
    expect( Table.isPrototypeOf( TableRow ) ).to.be.true;
  } );

  it( 'Should only permit table cells as child nodes', () => {
    expect( TableRow ).to.have.property( 'permittedChildrenNodeType', TableCell );
  } );

  it( 'Should append table cells', () => {
    const element = new TableRow,
          cell    = new TableCell;

    element.appendChild( cell );

    expect( element.firstChild ).to.equal( cell );
  } );

  it( 'Should bail on appending table column cells', () => {
    const element = new TableRow,
          cell    = new TableColumnCell;

    // noinspection JSCheckFunctionSignatures
    expect( () => element.appendChild( cell ) ).to.throw( TypeError );
  } );

  it( 'Should bail on appending other elements than table cells', () => {
    const element = new TableRow,
          cell    = new Element;

    // noinspection JSCheckFunctionSignatures
    expect( () => element.appendChild( cell ) ).to.throw( TypeError );
  } );

  it( 'Should allow creating a row with children directly', () => {
    const element = TableRow.withCells( [
      'foo',
      'bar',
      new TableCell( 'baz' )
    ] );

    expect( element.textContent ).to.equal( 'foo\nbar\nbaz' );
  } );
} );
