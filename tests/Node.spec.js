'use strict';

/*
 global module,
 require,
 exports,
 describe,
 it
 */

const { expect } = require('chai');

const Node = require( '../lib/document/Node' );

describe( 'Nodes', () => {
  describe( 'Adding children', () => {
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
  } );

  describe( 'Retrieving children', () => {
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

    it( 'Should retrieve the previous sibling node', () => {
      const root = new Node,
            a    = new Node,
            b    = new Node;

      root.appendChild( a );
      root.appendChild( b );

      expect( b.previousSibling ).to.equal( a );
    } );

    it( 'Should retrieve the next sibling node', () => {
      const root = new Node,
            a    = new Node,
            b    = new Node;

      root.appendChild( a );
      root.appendChild( b );

      expect( a.nextSibling ).to.equal( b );
    } );

    it( 'Should retrieve children of a node type', () => {
      class A extends Node {
      }

      const root = new Node,
            a1   = new A,
            a2   = new A,
            n1   = new Node,
            n2   = new Node;

      root.appendChild( a1 );
      root.appendChild( n1 );
      n1.appendChild( a2 );
      a1.appendChild( n2 );

      expect( root.getElementsByNodeType( 'A' ) ).to.be.an( 'array' ).of.length( 2 );
    } );
  } );

  describe( 'Removing nodes', () => {
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

    it( 'Should bail on invalid children', () => {
      const node = new Node;

      expect( () => node.removeChild( 'foo' ) ).to.throw( TypeError );
      expect( () => node.removeChild( false ) ).to.throw( TypeError );
      expect( () => node.removeChild( {} ) ).to.throw( TypeError );
      expect( () => node.removeChild( [] ) ).to.throw( TypeError );
      expect( () => node.removeChild( null ) ).to.throw( TypeError );
      expect( () => node.removeChild( undefined ) ).to.throw( TypeError );
      expect( () => node.removeChild() ).to.throw( TypeError );
    } );

    it( 'Should remove itself', () => {
      const root  = new Node,
            child = new Node;

      root.appendChild( child );

      child.remove();

      expect( root ).to.have.length( 0 );
    } );

    it( 'Should do nothing on removing a root node', () => {
      const root = new Node;

      expect( root.remove() ).to.be.an( 'undefined' );
      expect( root.isRootNode ).to.be.true;
    } );
  } );

  describe( 'Finding nodes', () => {
    it( 'Should find nodes by ID', () => {
      const root   = new Node,
            child1 = new Node,
            child2 = new Node;

      root.appendChild( child1 );
      child1.appendChild( child2 );

      expect( root.find( '0' ) ).to.equal( root );
      expect( root.find( '0:0' ) ).to.equal( child1 );
      expect( root.find( '0:0:0' ) ).to.equal( child2 );
    } );

    it( 'Should find nodes by UID', () => {
      const root   = new Node,
            child1 = new Node,
            child2 = new Node;

      let child1UID = child1.uid,
          child2UID = child2.uid;

      root.appendChild( child1 );
      child1.appendChild( child2 );

      expect( root.find( child1UID ) ).to.equal( child1 );
      expect( root.find( child2UID ) ).to.equal( child2 );
    } );

    it( 'Should find nodes by reference', () => {
      const root   = new Node,
            child1 = new Node,
            child2 = new Node;

      root.appendChild( child1 );
      child1.appendChild( child2 );

      expect( root.find( child1 ) ).to.equal( child1 );
      expect( root.find( child2 ) ).to.equal( child2 );
    } );

    it( 'Should find nodes by callback', () => {
      const root   = new Node,
            child1 = new Node,
            child2 = new Node;

      root.appendChild( child1 );
      child1.appendChild( child2 );

      const finder = node => {
        if ( node.parentNode === child1 ) {
          return true;
        }
      };

      expect( root.find( finder ) ).to.equal( child2 );
    } );

    it( 'Should find ancestors', () => {
      const root   = new Node,
            child1 = new Node,
            child2 = new Node,
            child3 = new Node;

      child2.appendChild( child3 );
      child1.appendChild( child2 );
      root.appendChild( child1 );

      expect( child3.hasAncestor( root ) ).to.be.true;
      expect( child2.hasAncestor( child3 ) ).to.be.false;
      expect( child3.hasAncestor( child3 ) ).to.be.false;
    } );

    it( 'Should find descendants', () => {
      const root   = new Node,
            child1 = new Node,
            child2 = new Node,
            child3 = new Node;

      child2.appendChild( child3 );
      child1.appendChild( child2 );
      root.appendChild( child1 );

      expect( root.hasDescendant( child3 ) ).to.be.true;
      expect( child2.hasDescendant( child1 ) ).to.be.false;
      expect( child2.hasDescendant( child2 ) ).to.be.false;
      expect( root.hasDescendant( child1 ) ).to.be.true;
    } );

    it( 'Should bail on invalid node type for ancestor/descendant', () => {
      const root = new Node;

      expect( () => root.hasAncestor( 'Node' ) ).to.throw( TypeError );
      expect( () => root.hasDescendant( 'Node' ) ).to.throw( TypeError );
    } );

    it( 'Should handle nodes from foreign trees while looking for ancestors/descendants', () => {
      const root1  = new Node,
            root2  = new Node,
            child1 = new Node,
            child2 = new Node;

      root1.appendChild( child1 );
      root2.appendChild( child2 );

      expect( root1.hasAncestor( root2 ) ).to.be.false;
      expect( child1.hasAncestor( child2 ) ).to.be.false;
      expect( child2.hasAncestor( root1 ) ).to.be.false;

      expect( root1.hasDescendant( child2 ) ).to.be.false;
      expect( root2.hasDescendant( child1 ) ).to.be.false;
      expect( child2.hasDescendant( root1 ) ).to.be.false;
    } );

    it( 'Should find a node by UID using the specialized method', () => {
      const root  = new Node,
            child = new Node;

      root.appendChild( child );

      expect( root.getElementByUid( child.uid ) ).to.equal( child );
    } );
  } );

  describe( 'Node meta data', () => {
    it( 'Should retrieve the root node', () => {
      const root   = new Node,
            child1 = new Node,
            child2 = new Node,
            child3 = new Node;

      child2.appendChild( child3 );
      child1.appendChild( child2 );
      root.appendChild( child1 );

      expect( child1.rootNode ).to.equal( root );
      expect( child2.rootNode ).to.equal( root );
      expect( child3.rootNode ).to.equal( root );
    } );

    it( 'Should retrieve the amount of children nodes using length', () => {
      const root = new Node,
            a    = new Node,
            b    = new Node,
            c    = new Node;

      root.appendChild( a );
      root.appendChild( b );
      root.appendChild( c );

      expect( root.length ).to.equal( 3 );
    } );

    it( 'Should retrieve the node depth', () => {
      const root = new Node,
            n1   = new Node,
            n2   = new Node,
            n3   = new Node;

      root.appendChild( n1 );
      n1.appendChild( n2 );
      n2.appendChild( n3 );

      expect( n3.depth ).to.equal( 3 );
    } );

    it( 'Should retrieve the node type', () => {
      class A extends Node {
      }

      const a = new A;

      expect( a.nodeType ).to.equal( 'A' );
    } );

    it( 'Should get and set the node value', () => {
      const node     = new Node;
      node.nodeValue = { foo: 'bar' };

      expect( node.nodeValue ).to.deep.equal( { foo: 'bar' } );
    } );

    it( 'Should set the node value using the constructor', () => {
      const node = new Node( { foo: 'bar' } );

      expect( node.nodeValue ).to.deep.equal( { foo: 'bar' } );
    } );
  } );

  describe( 'Node IDs', () => {
    it( 'Should generate unique IDs', () => {

      // create an array of 1024 nodes, taking their UID property
      const UIDs = new Array( 1024 )
        .fill( undefined )
        .map( i => (new Node).uid );

      // create a new set from the UIDs, which is by definition unique
      const UIDSet = new Set( UIDs );

      // we can assume each UID must be unique if the set has the same size as the array
      expect( UIDSet.size ).to.equal( 1024 );
    } );

    it( 'Should generate IDs', () => {
      const root = new Node,
            a    = new Node,
            b    = new Node,
            aa   = new Node,
            ab   = new Node,
            ba   = new Node,
            bb   = new Node,
            aaa  = new Node,
            aab  = new Node,
            aac  = new Node,
            aba  = new Node,
            abb  = new Node,
            baa  = new Node,
            bba  = new Node,
            bbb  = new Node,
            bbc  = new Node,
            bbd  = new Node;

      root.appendChild( a );
      root.appendChild( b );
      a.appendChild( aa );
      a.appendChild( ab );
      b.appendChild( ba );
      b.appendChild( bb );
      aa.appendChild( aaa );
      aa.appendChild( aab );
      aa.appendChild( aac );
      ab.appendChild( aba );
      ab.appendChild( abb );
      ba.appendChild( baa );
      bb.appendChild( bba );
      bb.appendChild( bbb );
      bb.appendChild( bbc );
      bb.appendChild( bbd );

      expect( root.id ).to.equal( '0' );
      expect( a.id ).to.equal( '0:0' );
      expect( b.id ).to.equal( '0:1' );
      expect( aa.id ).to.equal( '0:0:0' );
      expect( ab.id ).to.equal( '0:0:1' );
      expect( ba.id ).to.equal( '0:1:0' );
      expect( bb.id ).to.equal( '0:1:1' );
      expect( aaa.id ).to.equal( '0:0:0:0' );
      expect( aab.id ).to.equal( '0:0:0:1' );
      expect( aac.id ).to.equal( '0:0:0:2' );
      expect( aba.id ).to.equal( '0:0:1:0' );
      expect( abb.id ).to.equal( '0:0:1:1' );
      expect( baa.id ).to.equal( '0:1:0:0' );
      expect( bba.id ).to.equal( '0:1:1:0' );
      expect( bbb.id ).to.equal( '0:1:1:1' );
      expect( bbc.id ).to.equal( '0:1:1:2' );
      expect( bbd.id ).to.equal( '0:1:1:3' );
    } );

    it( 'Should update IDs', () => {
      const root   = new Node,
            child1 = new Node,
            child2 = new Node;

      expect( child1.id ).to.equal( '0' );
      expect( child2.id ).to.equal( '0' );

      root.appendChild( child1 );

      expect( child1.id ).to.equal( '0:0' );

      root.appendChild( child2 );

      expect( child2.id ).to.equal( '0:1' );

      child1.remove();

      expect( child1.id ).to.equal( '0' );

      child2.appendChild( child1 );

      expect( child1.id ).to.equal( '0:1:0' );

      /////
      // TODO: If a node is removed, the parent should broadcast the imperative ID change to all of
      // its children nodes. If this is implemented correctly, the above test will fail and should
      // be switched out for the following:
      // expect( child1.id ).to.equal( '0:0:0' );
      //
      // Still, however, there's a fundamental problem with this approach, and it might be more
      // beneficial to either make IDs entirely dynamic or remove the concept completely.
      // IDs are heritage from Arboreal.
    } );
  } );

  it( 'Should convert nodes to array', () => {
    const root = new Node,
          n1   = new Node,
          n2   = new Node,
          n3   = new Node;

    root.appendChild( n1 );
    root.appendChild( n2 );
    root.appendChild( n3 );

    expect( root.toArray() ).to.be.an( 'array' ).of.length( 4 );
  } );
} );
