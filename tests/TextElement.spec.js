'use strict';

/*
 global module,
 require,
 exports,
 describe,
 it
 */

const expect = require( 'chai' ).expect;

const TextElement = require( '../lib/document/element/TextElement' ),
      Node        = require( '../lib/document/Node' );

describe( 'Text elements', () => {
  it( 'Should inherit from Node', () => {
    expect( Node.isPrototypeOf( TextElement ) ).to.be.true;
  } );

  it( 'Should retrieve the element type name', () => {
    const element = new TextElement;

    expect( element.name ).to.equal( 'TextElement' );
  } );

  it( 'Should get and set its text content', () => {
    const element = new TextElement;

    element.textContent = 'foo bar baz';

    expect( element.textContent ).to.equal( 'foo bar baz' );
  } );

  it( 'Should append text', () => {
    const element = new TextElement;

    element.textContent = 'foo ';
    element.appendText( 'bar' );

    expect( element.textContent ).to.equal( 'foo bar' );
  } );

  it( 'Should replace text', () => {
    const element = new TextElement;

    element.textContent = 'foo bar';

    element.replaceText( 4, 3, 'baz quz' );

    expect( element.textContent ).to.equal( 'foo baz quz' );
  } );

  it( 'Should delete text', () => {
    const element = new TextElement;

    element.textContent = 'foo bar';

    element.deleteText( 3, 3 );

    expect( element.textContent ).to.equal( 'foor' );
  } );

  it( 'Should insert text', () => {
    const element = new TextElement;

    element.textContent = 'foo bar';

    element.insertText( 3, ' quz' );

    expect( element.textContent ).to.equal( 'foo quz bar' );
  } );

  it( 'Should extract text', () => {
    const element = new TextElement;

    element.textContent = 'foo bar baz';

    element.substringText( 3, 4 );

    expect( element.textContent ).to.equal( 'foo baz' );
  } );

  it( 'Should stringify its text content', () => {
    const element = new TextElement;

    element.textContent = 'foo';

    expect( element.toString() ).to.equal( 'foo' );
  } );
} );
