'use strict';

/*
 global module,
 require,
 exports,
 describe,
 it
 */

const { expect } = require('chai');

const TextElement = require( '../lib/document/element/TextElement' ),
      Text        = require( '../lib/document/element/Text' );

describe( 'Text elements', () => {
  it( 'Should inherit from TextElement', () => {
    expect( TextElement.isPrototypeOf( Text ) ).to.be.true;
  } );

  it( 'Should set the text content on construction', () => {
    const element = new Text( 'foo bar baz' );

    expect( element.textContent ).to.equal( 'foo bar baz' );
  } );

  it( 'Should create text elements without content', () => {
    const element = new Text;

    expect( element ).to.have.property( 'textContent', '' );
  } );

  it( 'Should allow setting text on the content and nodeValue properties', () => {
    const element = new Text;

    expect( element.textContent ).to.equal( '' );

    element.textContent = 'foo';

    expect( element.textContent ).to.equal( 'foo' );

    element.nodeValue = 'bar';

    expect( element.nodeValue ).to.equal( 'bar' );

    expect( element.nodeValue ).to.equal( element.textContent );
  } );

  it( 'Should return the text content as node value', () => {
    const element = new Text( 'foo bar baz' );

    expect( element.nodeValue ).to.equal( element.textContent ).and.to.equal( 'foo bar baz' );
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

  it( 'Should replace text', () => {
    const element = new Text( 'foo' );

    expect( element.textContent ).to.equal( 'foo' );

    element.replaceWith( 'bar' );

    expect( element.textContent ).to.equal( 'bar' );
  } );
} );
