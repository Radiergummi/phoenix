'use strict';

/*
 global module,
 require,
 exports,
 describe,
 it
 */

const expect  = require( 'chai' ).expect,
      { URL } = require( 'url' );

const Image = require( '../lib/document/element/Image' );

describe( 'Image elements', () => {

  it( 'Should create images without initial URL', () => {
    const element = new Image();

    expect( element.toString() ).to.equal( '' );
  } );

  it( 'Should bail on creating images to invalid sources', () => {
    const element = new Image();

    // noinspection JSCheckFunctionSignatures
    expect( () => element.setSource( 42 ) ).to.throw( TypeError );
    // noinspection JSCheckFunctionSignatures
    expect( () => element.setSource( new Symbol( 'foo' ) ) ).to.throw( TypeError );
    // noinspection JSCheckFunctionSignatures
    expect( () => element.setSource( [] ) ).to.throw( TypeError );
  } );

  it( 'Should add http:// to protocol-less URLs', () => {
    const element = new Image( 'foo.bar/' );

    expect( element.toString() ).to.equal( 'http://foo.bar/' );
  } );

  it( 'Should create a URL instance for valid URL strings', () => {
    const element = new Image( 'https://foo.bar/' );

    expect( element.toString() ).to.equal( 'https://foo.bar/' );
  } );

  it( 'Should use a passed URL instance', () => {
    const target  = new URL( 'https://foo.bar/' ),
          element = new Image( target );

    expect( element.getSource() ).to.equal( target );
  } );

  it( 'Should retrieve the target URL instance', () => {
    const element = new Image( 'https://foo.bar/' );

    expect( element.getSource() ).to.be.a( 'url' );
  } );
} );
