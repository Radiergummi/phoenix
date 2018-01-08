'use strict';

/*
 global module,
 require,
 exports,
 describe,
 it
 */

const expect = require( 'chai' ).expect;

const Separator   = require( '../lib/document/element/Separator' ),
      VoidElement = require( '../lib/document/element/VoidElement' );

describe( 'Separator elements', () => {
  it( 'Should inherit from VoidElement', () => {
    expect( VoidElement.isPrototypeOf( Separator ) ).to.be.true;
  } );
} );
