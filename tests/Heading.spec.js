'use strict';

/*
 global module,
 require,
 exports,
 describe,
 it
 */

const { expect } = require('chai');

const Heading = require( '../lib/document/element/Heading' ),
      Text    = require( '../lib/document/element/Text' );

describe( 'Heading elements', () => {
  it( 'Should turn strings into text nodes', () => {
    const element = new Heading( 'foo\nbar\n\nbaz\n\n\nquz' );

    expect( element.textContent ).to.equal( 'foo\nbar\n\nbaz\n\n\nquz' );
    expect( element.firstChild ).to.be.an.instanceof( Text );
  } );

  it( 'Should accept text nodes', () => {
    const text    = new Text( 'foo bar baz' ),
          heading = new Heading( text );

    expect( heading.firstChild ).to.equal( text );
  } );
} );
