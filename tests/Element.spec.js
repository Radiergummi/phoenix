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
      Node    = require( '../lib/document/Node' ),
      Text    = require( '../lib/document/element/Text' );

describe( 'Elements', () => {
  it( 'Should inherit from Node', () => {
    expect( Node.isPrototypeOf( Element ) ).to.be.true;
  } );

  it( 'Should guard some attributes', () => {
    // noinspection JSUnresolvedVariable
    expect( Array.from( Element._guardedAttributes ) ).to.include.members( [
        'appendChild',
        'attributes',
        'childElementCount',
        'constructor',
        'depth',
        'find',
        'firstChild',
        'getAttribute',
        'getElementByUid',
        'getElementsByNodeType',
        'hasAncestor',
        'hasAttribute',
        'hasDescendant',
        'isRootNode',
        'lastChild',
        'length',
        'name',
        'nextSibling',
        'nodeType',
        'nodeValue',
        'parentNode',
        'prependChild',
        'previousSibling',
        'remove',
        'removeAttribute',
        'removeChild',
        'rootNode',
        'setAttribute',
        'textContent',
        'toArray',
        'toString',
        'traverseDown',
        'traverseUp'
      ]
    );
  } );

  it( 'Should retrieve the element type name', () => {
    const element = new Element;

    expect( element.name ).to.equal( 'Element' );
  } );

  it( 'Should set and get an attribute', () => {
    const element = new Element;

    element.setAttribute( 'foo', 'bar' );

    expect( element.getAttribute( 'foo' ) ).to.equal( 'bar' );
  } );

  it( 'Should set an attribute on the instance', () => {
    const element = new Element;

    element.setAttribute( 'foo', 'bar' );

    // noinspection JSUnresolvedVariable
    expect( element.foo ).to.equal( 'bar' );
  } );

  it( 'Should not set a guarded attribute on the instance', () => {
    const element         = new Element,
          oldSetAttribute = Element.prototype.setAttribute;

    element.setAttribute( 'setAttribute', 42 );

    expect( element.getAttribute( 'setAttribute' ) ).to.equal( 42 );
    expect( element.setAttribute ).to.equal( oldSetAttribute );
  } );

  it( 'Should allow modification of instance enabled attributes', () => {
    const element = new Element;

    element.setAttribute( 'foo', 'bar' );

    expect( element.foo ).to.equal( 'bar' );

    // noinspection JSUnresolvedVariable
    element.foo = 'quz';

    // noinspection JSUnresolvedVariable
    expect( element.foo ).to.equal( 'quz' );
    expect( element.getAttribute( 'foo' ) ).to.equal( 'quz' );
  } );

  it( 'Should allow setting multiple properties at once', () => {
    const element = new Element;

    element.attributes = {
      foo:    'bar',
      answer: 42
    };

    // noinspection JSUnresolvedVariable
    expect( element.foo ).to.equal( 'bar' );
    // noinspection JSUnresolvedVariable
    expect( element.answer ).to.equal( 42 );
  } );

  it( 'Should bail if a non-object type is passed to the attributes setter', () => {
    const element = new Element;

    expect( () => element.attributes = [ 'foo', 'bar' ] ).to.throw( TypeError );
  } );

  it( 'Should remove an attribute', () => {
    const element = new Element;

    element.setAttribute( 'foo', 'bar' );

    expect( element.foo ).to.equal( 'bar' );

    element.removeAttribute( 'foo' );

    expect( element.foo ).to.be.an( 'undefined' );
    expect( element.getAttribute( 'foo' ) ).to.be.an( 'undefined' );
  } );

  it( 'Should set its textContent', () => {
    const element = new Element;

    element.textContent = 'foo bar baz';

    expect( element.firstChild.nodeType ).to.equal( 'Text' );
    expect( element.textContent ).to.equal( 'foo bar baz' );
  } );

  it( 'Should join all children Text nodes as textContent', () => {
    const element = new Element;

    element.appendChild( new Text( 'foo' ) );
    element.appendChild( new Text( 'bar' ) );
    element.appendChild( new Text( 'baz' ) );

    expect( element.textContent ).to.equal( 'foo\nbar\nbaz' );
  } );

  it( 'Should join all nested children Text nodes as textContent', () => {
    const element = new Element,
          child1  = new Element,
          child2  = new Element;

    /*
     It is important not to mess up the appendChild order here.
     As written below, the tree looks like this:
     element
      ├── [Text]
      └── child1
          ├── [Text]
          └── child2
              └── [Text]

     Try to think of the browser DOM - would we append the children elements first, the text
     nodes second, the tree would look like this instead:
     element
     ├── child1
     │   ├── child2
     │   │   └── [Text]
     │   └── [Text]
     └── [Text]

     Therefore, as soon as we merge those text nodes, the outcome will be "baz\nbar\nfoo", since
     the textContent getter simply uses the iterateDown method that walks children following their
     order in the parent element.

     Hours wasted with this (increment counter if necessary): 1
     */

    element.appendChild( new Text( 'foo' ) );
    child1.appendChild( new Text( 'bar' ) );
    child2.appendChild( new Text( 'baz' ) );

    element.appendChild( child1 );
    child1.appendChild( child2 );

    expect( element.textContent ).to.equal( 'foo\nbar\nbaz' );
  } );

  it( 'Should stringify its textContent', () => {
    const element = new Element;

    element.appendChild( new Text( 'foo' ) );
    element.appendChild( new Text( 'bar' ) );
    element.appendChild( new Text( 'baz' ) );

    expect( element.toString() ).to.equal( 'foo\nbar\nbaz' );
  } );
} );
