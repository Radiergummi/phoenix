'use strict';

/*
 global module,
 require
 */

const Node    = require( './Node' );
const Section = require( './Section' );

/**
 * Pages are actual pages for a specific documentation chapter
 *
 * @class
 * @extends Documents.Node
 * @memberOf Documents
 */
class Page extends Node {

  /**
   * creates a new Page
   *
   * @param {string} [name]       page name
   * @param {Array}  [childNodes] page children
   *
   * @constructor
   */
  constructor ( name = '', childNodes = [] ) {
    super();

    this.name = name;
    childNodes.forEach( node => this.appendChild( node ) );
  }

  /**
   * adds a new section to the page
   *
   * @param  {Section|string} section section to add. can be a Section item or a string that will be
   *                                  used as the name for a new section.
   * @param  {*}              [args]  optional args for the section constructor
   * @return {Node}                   the new section
   */
  addSection ( section, ...args ) {
    return this.appendChild(
      section instanceof Section
        ? section
        : new Section( section, ...args )
    );
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
