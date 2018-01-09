'use strict';

/*
 global module,
 require,
 exports,
 describe,
 it
 */

const { expect } = require('chai');

const Paragraph = require( '../lib/document/element/Paragraph' ),
      Text      = require( '../lib/document/element/Text' ),
      Element   = require( '../lib/document/element/Element' );

describe( 'Paragraph elements', () => {
  it( 'Should inherit from Element', () => {
    expect( Element.isPrototypeOf( Paragraph ) ).to.be.true;
  } );

  it( 'Should turn strings into text nodes', () => {
    const element = new Paragraph( 'foo\nbar\n\nbaz\n\n\nquz' );

    expect( element.textContent ).to.equal( 'foo\nbar\n\nbaz\n\n\nquz' );
    expect( element.firstChild ).to.be.an.instanceof( Text );
  } );

  it( 'Should accept text nodes', () => {
    const text      = new Text( 'foo bar baz' ),
          paragraph = new Paragraph( text );

    expect( paragraph.firstChild ).to.equal( text );
  } );
} );
