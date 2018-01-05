'use strict';

/*
 global module,
 require,
 exports,
 describe,
 it
 */

const expect = require( 'chai' ).expect;

const Element          = require( '../lib/document/element/Element' ),
      ChildlessElement = require( '../lib/document/element/ChildlessElement' );

describe( 'Childless elements', () => {
  it( 'Should inherit from Element', () => {
    expect( Element.isPrototypeOf( ChildlessElement ) ).to.be.true;
  } );

  it( 'Should not append children', () => {
    const element = new ChildlessElement;

    // noinspection JSCheckFunctionSignatures
    expect( element.appendChild( new Element ) ).to.equal( null );
  } );

  it( 'Should not prepend children', () => {
    const element = new ChildlessElement;

    // noinspection JSCheckFunctionSignatures
    expect( element.prependChild( new Element ) ).to.equal( null );
  } );

  it( 'Should not remove children', () => {
    const element = new ChildlessElement;

    // noinspection JSCheckFunctionSignatures
    expect( element.removeChild( new Element ) ).to.equal( null );
  } );
} );
