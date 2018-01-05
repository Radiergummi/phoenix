'use strict';

/*
 global module,
 require,
 exports,
 describe,
 it
 */

const expect = require( 'chai' ).expect;

const Element = require( '../lib/document/element/Element' ),
      Text    = require( '../lib/document/element/Text' );

describe( 'Text elements', () => {
  it( 'Should inherit from Element', () => {
    expect( Element.isPrototypeOf( Text ) ).to.be.true;
  } );

  it( 'Should set the text content on construction', () => {
    const element = new Text( 'foo bar baz' );

    expect( element.textContent ).to.equal( 'foo bar baz' );
  } );

  it( 'Should create text elements without content', () => {
    const element = new Text;

    expect( element ).to.have.property( 'content', '' );
  } );

  it( 'Should return the text content as node value', () => {
    const element = new Text( 'foo bar baz' );

    expect( element.nodeValue ).to.equal( 'foo bar baz' );
  } );

  it( 'Should return the text content length as length', () => {
    const element = new Text( 'foo' );

    expect( element.length ).to.equal( 3 );
  } );

  it( 'Should append text', () => {
    const element = new Text( 'foo' );

    expect( element.textContent ).to.equal( 'foo' );

    element.appendText( ' bar' );

    expect( element.textContent ).to.equal( 'foo bar' );
  } );

  it( 'Should append text', () => {
    const element = new Text( 'foo' );

    expect( element.textContent ).to.equal( 'foo' );

    element.replaceText( 'bar' );

    expect( element.textContent ).to.equal( 'bar' );
  } );
} );
