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
  describe( 'Nodes', () => {
    it( 'Should append children', () => {
      const node   = new Node,
            child1 = new Node,
            child2 = new Node,
            child3 = new Node;

      node.appendChild( child1 );
      node.appendChild( child2 );
      node.appendChild( child3 );

      expect( node ).to.have.length( 3 );
    } );

    it( 'Should retrieve the first child node', () => {
      const node   = new Node,
            child1 = new Node,
            child2 = new Node;

      node.appendChild( child1 );

      expect( node.firstChild ).to.equal( child1 );

      node.appendChild( child2 );

      expect( node.firstChild ).to.equal( child1 );
    } );

    it( 'Should retrieve the last child node', () => {
      const node   = new Node,
            child1 = new Node,
            child2 = new Node;

      node.appendChild( child1 );

      expect( node.lastChild ).to.equal( child1 );

      node.appendChild( child2 );

      expect( node.lastChild ).to.equal( child2 );
    } );

    it( 'Should prepend children', () => {
      const node   = new Node,
            child1 = new Node,
            child2 = new Node,
            child3 = new Node;

      node.appendChild( child1 );
      node.appendChild( child2 );
      node.prependChild( child3 );

      expect( node.firstChild ).to.equal( child3 );
    } );

    it( 'Should remove children by child', () => {
      const node   = new Node,
            child1 = new Node,
            child2 = new Node,
            child3 = new Node;

      node.appendChild( child1 );
      node.appendChild( child2 );
      node.appendChild( child3 );

      node.removeChild( child2 );

      expect( node.length ).to.equal( 2 );
      expect( node.firstChild ).to.equal( child1 );
      expect( node.lastChild ).to.equal( child3 );
    } );

    it( 'Should remove children by index', () => {
      const node   = new Node,
            child1 = new Node,
            child2 = new Node,
            child3 = new Node;

      node.appendChild( child1 );
      node.appendChild( child2 );
      node.appendChild( child3 );

      node.removeChild( 1 );

      expect( node.length ).to.equal( 2 );
      expect( node.firstChild ).to.equal( child1 );
      expect( node.lastChild ).to.equal( child3 );
    } );

    it( 'Should remove itself', () => {
      const root  = new Node,
            child = new Node;

      root.appendChild( child );

      child.remove();

      expect( root ).to.have.length( 0 );
    } );
  } );

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
