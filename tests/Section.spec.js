'use strict';

/*
 global module,
 require,
 exports,
 describe,
 it
 */

const expect = require( 'chai' ).expect;

const Section = require( '../lib/document/element/Section' ),
      Element = require( '../lib/document/element/Element' );

describe( 'Section elements', () => {
  it( 'Should inherit from Element', () => {
    expect( Element.isPrototypeOf( Section ) ).to.be.true;
  } );
} );
