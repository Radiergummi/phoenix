'use strict';

/*
 global module,
 require,
 exports,
 describe,
 it
 */
const expect = require( 'chai' ).expect;

const ChildlessElement = require( '../lib/document/element/ChildlessElement' ),
      Comment          = require( '../lib/document/element/Comment' ),
      Element          = require( '../lib/document/element/Element' ),
      Node             = require( '../lib/document/Node' ),
      Section          = require( '../lib/document/element/Section' ),
      Text             = require( '../lib/document/element/Text' );

describe( 'Documents', () => {

  describe( 'Elements', () => {
    describe( 'Section', () => {
      it( 'Should create section elements', () => {
        const section = new Section();

        expect( section ).to.be.an.instanceof( Section );
      } );
    } );
  } );
} );
