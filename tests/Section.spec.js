'use strict';

/*
 global module,
 require,
 exports,
 describe,
 it
 */

const { expect } = require('chai');

const Section = require( '../lib/document/element/Section' ),
      Element = require( '../lib/document/element/Element' );

describe( 'Section elements', () => {
  it( 'Should inherit from Element', () => {
    expect( Element.isPrototypeOf( Section ) ).to.be.true;
  } );
} );
