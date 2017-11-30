'use strict';

/*
 global module,
 require
 */

const Node = require( './Node' );
const Page = require( './Page' );

/**
 * @name Abstract document
 * @description A Document instance is an abstract way to describe the output document without
 * actually touching the implementation. The document holds all document nodes, for example pages,
 * sections, down to individual paragraphs. Once the parser finishes, it returns a Document instance
 * that can then be transformed into the actual output format.
 * A *document* describes the documentation as a whole. Therefore, it's the tree root for all
 * subordinate pages.
 *
 * @extends Node
 * @class
*/
class Document extends Node {
  constructor ( title = '' ) {
    super( { title } );

    /**
     * holds all source nodes
     *
     * @type {Node}
     */
    this._value.sources = new Node( {} );
  }

  /**
   * adds a new page. if the first argument is not a Page, all args will be passed to the Page
   * constructor
   *
   * @param  {Page|string} page page instance or page title
   * @param  {*}           args args for the page constructor
   * @return {Node}             the new node
   */
  addPage ( page, ...args ) {
    return this.appendChild(
      page instanceof Page
        ? page
        : new Page( page, ...args )
    );
  }

  /**
   * merges the pages of other documents into the current
   *
   * @param {Array.<Document>} documents arbitrary number of documents to merge
   */
  merge ( ...documents ) {
    for ( let document of documents ) {
      document.pages.forEach( page => this.addPage( page ) );
    }
  }

  get parentNode () {
    return null;
  }

  set parentNode ( parent ) {
    return null;
  }

  /**
   * retrieves the document title
   *
   * @return {string}
   */
  get title () {
    return this._value.title;
  }

  /**
   * sets the document title
   *
   * @param {string} newTitle
   */
  set title ( newTitle ) {
    this._value.title = newTitle;
  }

  /**
   * retrieves all pages in the document
   *
   * @return {Array}
   */
  get pages () {
    return this.getElementsByNodeType( 'Page' );
  }

  /**
   * retrieves the source nodes
   *
   * @return {Node}
   */
  get sources () {
    return this._value.sources;
  }

  /**
   * retrieves the Page
   *
   * @return {Page}
   * @constructor
   */
  static get Page () {
    return Page;
  }
}

/**
 * @type {Document}
 */
module.exports = Document;
