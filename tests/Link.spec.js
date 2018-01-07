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
      Link    = require( '../lib/document/element/Link' );

describe( 'Link elements', () => {
  it( 'Should create links for other document nodes by reference', () => {
    const root   = new Element,
          target = new Element,
          link   = new Link( target );

    root.appendChild( target );
    root.appendChild( link );

    expect( link.getAttribute( 'target' ) ).to.equal( target );
  } );

  it( 'Should create links for other document nodes by UID', () => {
    const root   = new Element,
          target = new Element,
          link   = new Link();

    root.appendChild( target );
    root.appendChild( link );

    link.setTarget( target.uid );

    expect( link.getAttribute( 'target' ) ).to.equal( target );
  } );

  it( 'Should bail on wrong UIDs', () => {
    const root   = new Element,
          target = new Element,
          link   = new Link();

    root.appendChild( target );
    root.appendChild( link );

    expect( () => link.setTarget( 'foo' ) ).to.throw( TypeError );
  } );

  it( 'Should expose target as an attribute if defined', () => {
    const root   = new Element,
          target = new Element,
          link   = new Link( target );

    root.appendChild( target );
    root.appendChild( link );

    expect( link.target ).to.equal( target );
  } );
} );
