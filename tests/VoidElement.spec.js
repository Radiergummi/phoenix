'use strict';

/*
 global module,
 require,
 exports,
 describe,
 it
 */

const { expect } = require('chai');

const Element          = require( '../lib/document/element/Element' ),
      VoidElement = require( '../lib/document/element/VoidElement' );

describe( 'Void elements', () => {
  it( 'Should inherit from Element', () => {
    expect( Element.isPrototypeOf( VoidElement ) ).to.be.true;
  } );

  it( 'Should not append children', () => {
    const element = new VoidElement;

    // noinspection JSCheckFunctionSignatures
    expect( element.appendChild( new Element ) ).to.equal( null );
  } );

  it( 'Should not prepend children', () => {
    const element = new VoidElement;

    // noinspection JSCheckFunctionSignatures
    expect( element.prependChild( new Element ) ).to.equal( null );
  } );

  it( 'Should not remove children', () => {
    const element = new VoidElement;

    // noinspection JSCheckFunctionSignatures
    expect( element.removeChild( new Element ) ).to.equal( null );
  } );
} );
