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

const ExternalLink = require( '../lib/document/element/ExternalLink' );

describe( 'External link elements', () => {

  it( 'Should create links without initial URL', () => {
    const element = new ExternalLink();

    expect( element.toString() ).to.equal( 'invalid://' );
  } );

  it( 'Should bail on creating links to invalid targets', () => {
    const element = new ExternalLink();

    // noinspection JSCheckFunctionSignatures
    expect( () => element.setTarget( 42 ) ).to.throw( TypeError );
    // noinspection JSCheckFunctionSignatures
    expect( () => element.setTarget( new Symbol( 'foo' ) ) ).to.throw( TypeError );
    // noinspection JSCheckFunctionSignatures
    expect( () => element.setTarget( [] ) ).to.throw( TypeError );
  } );

  it( 'Should add http:// to protocol-less URLs', () => {
    const element = new ExternalLink( 'foo.bar/' );

    expect( element.toString() ).to.equal( 'http://foo.bar/' );
  } );

  it( 'Should create a URL instance for valid URL strings', () => {
    const element = new ExternalLink( 'https://foo.bar/' );

    expect( element.toString() ).to.equal( 'https://foo.bar/' );
  } );

  it( 'Should use a passed URL instance', () => {
    const target  = new URL( 'https://foo.bar/' ),
          element = new ExternalLink( target );

    expect( element.getTarget() ).to.equal( target );
  } );

  it( 'Should retrieve the target URL instance', () => {
    const element = new ExternalLink( 'https://foo.bar/' );

    expect( element.getTarget() ).to.be.a( 'url' );
  } );
} );
