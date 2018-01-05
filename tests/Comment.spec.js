'use strict';

/*
 global module,
 require,
 exports,
 describe,
 it
 */

const expect = require( 'chai' ).expect;

const Comment = require( '../lib/document/element/Text' );

describe( 'Comment elements', () => {
  it( 'Should preserve line breaks in the content', () => {
    const comment = new Comment( 'foo\nbar\n\nbaz\n\n\nquz' );

    expect( comment.textContent ).to.equal( 'foo\nbar\n\nbaz\n\n\nquz' );
  } );
} );
