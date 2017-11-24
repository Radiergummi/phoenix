'use strict';

/*
 global module,
 require
 */

const Node    = require( './Node' );
const Section = require( './Section' );

/**
 * @name Page
 * @extends Node
 */
class Page extends Node {
  constructor ( name = '', childNodes = [] ) {
    super();

    this.name = name;
    childNodes.forEach( node => this.appendChild( node ) );
  }

  /**
   * adds a new section to the page
   *
   * @param  {*}    args
   * @return {Page}
   */
  addSection ( ...args ) {
    this.appendChild( new Section( ...args ) );

    return this;
  }

  /**
   * retrieves the page name
   *
   * @return {string}
   */
  get name () {
    return this._value.name;
  }

  /**
   * sets the page name
   *
   * @param {string} newName
   */
  set name ( newName ) {
    this._value.name = newName;
  }
}

/**
 * @type {Page}
 */
module.exports = Page;
