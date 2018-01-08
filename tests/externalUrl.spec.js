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

const { stringToUrl, urlToString } = require( '../lib/document/helper/externalUrl' );

describe( 'External URL helper', () => {
  describe( 'String to URL', () => {
    it( 'Should convert a valid HTTPS URL into a URL instance', () => {
      expect( stringToUrl( 'https://google.com' ) )
        .to.be.a( 'url' );
    } );

    it( 'Should convert a valid URL into a URL instance', () => {
      expect( stringToUrl( 'foo-bar://google.com' ) )
        .to.be.a( 'url' );
    } );

    it( 'Should convert an invalid string URL into a URL instance', () => {
      expect( stringToUrl( 'google' ) )
        .to.be.a( 'url' )
        .with.property( 'protocol', 'http:' );
    } );

    it( 'Should recycle a URL instance', () => {
      const url = new URL( 'https://google.com' );

      expect( stringToUrl( url ) )
        .to.equal( url );
    } );

    it( 'Should handle invalid arguments gracefully', () => {
      expect( stringToUrl( 42 ) )
        .to.be.a( 'url' )
        .with.property( 'protocol', 'invalid:' );
    } );
  } );

  describe( 'URL to String', () => {
    it( 'Should convert URL instances to strings', () => {
      expect( urlToString( new URL( 'https://google.com' ) ) )
        .to.equal( 'https://google.com/' );
    } );

    it( 'Should convert objects with a toString method to strings', () => {
      expect( urlToString( {
        toString () {
          return 'foo';
        }
      } ) ).to.equal( 'foo' );

      expect( urlToString( 42 ) ).to.equal( '42' );
    } );

    it( 'Should return an empty string for wrong types', () => {
      expect( urlToString( null ) ).to.equal( '' );
    } );
  } );
} );
