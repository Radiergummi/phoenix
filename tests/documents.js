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

  describe( 'Childless elements', () => {
    it( 'Should not append children elements', () => {
      const childlessElement = new ChildlessElement();

      expect( childlessElement ).to.be.an.instanceof( ChildlessElement );

      // noinspection JSCheckFunctionSignatures
      expect( childlessElement.appendChild( new ChildlessElement() ) ).to.be.null;
    } );

    it( 'Should not prepend children elements', () => {
      const childlessElement = new ChildlessElement();

      // noinspection JSCheckFunctionSignatures
      expect( childlessElement.prependChild( new ChildlessElement() ) ).to.be.null;
    } );

    it( 'Should not remove children elements', () => {
      const childlessElement = new ChildlessElement();

      // noinspection JSCheckFunctionSignatures
      expect( childlessElement.removeChild( new ChildlessElement() ) ).to.be.null;
    } );

    describe( 'Text', () => {
      it( 'Should create text elements', () => {
        const text = new Text( 'foo bar baz' );

        expect( text ).to.be.an.instanceof( Text );
        expect( text ).to.have.property( 'content', 'foo bar baz' );
      } );

      it( 'Should create text elements without content', () => {
        const text = new Text();

        expect( text ).to.be.an.instanceof( Text );
        expect( text ).to.have.property( 'content', '' );
      } );

      it( 'Should append text to the content', () => {
        const text = new Text( 'foo' );

        text.appendText( ' bar' );
        expect( text.textContent ).to.equal( 'foo bar' );

        text.appendText();
        expect( text.textContent ).to.equal( 'foo bar' );
      } );

      it( 'Should replace the content text', () => {
        const text = new Text( 'foo' );

        text.replaceText( 'bar' );
        expect( text.textContent ).to.equal( 'bar' );

        text.replaceText();
        expect( text.textContent ).to.equal( '' );
      } );

      it( 'Should return the text content character length', () => {
        const text = new Text( 'foo bar baz' );

        expect( text.length ).to.equal( 'foo bar baz'.length );
      } );

      it( 'Should return the content as node value', () => {
        const text = new Text( 'foo bar baz' );

        expect( text.nodeValue ).to.equal( 'foo bar baz' );
      } );
    } );

    describe( 'Comments', () => {
      it( 'Should create comment elements', () => {
        const comment = new Comment( 'foo bar baz' );

        expect( comment ).to.be.an.instanceof( Comment );
        expect( comment ).to.have.property( 'content', 'foo bar baz' );
      } );

      it( 'Should set its text content', () => {
        const comment = new Comment( 'foo bar baz' );

        expect( comment.textContent ).to.equal( 'foo bar baz' );
      } );

      it( 'Should preserve line breaks in the content', () => {
        const comment = new Comment( 'foo\nbar\n\nbaz\n\n\nquz' );

        expect( comment.textContent ).to.equal( 'foo\nbar\n\nbaz\n\n\nquz' );
      } );
    } );
  } );
} );
