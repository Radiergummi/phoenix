'use strict';

/*
 global module,
 require
 */

const Node = require( '../Node' );

/**
 * Provides a document element that can be populated with text, attributes and children nodes. This
 * is the most basic building block of documentation items and the prototype of all other document
 * elements.
 *
 * @class
 * @extends Node
 */
class Element extends Node {

  /**
   * Creates a new element
   *
   * @param {*} args passes all args to the Node constructor
   * @see Node#constructor
   *
   * @constructor
   */
  constructor ( ...args ) {
    super( ...args );

    /**
     * holds the elements attributes
     *
     * @type {object}
     */
    this._value.attributes = {};

    // TODO: Set default attributes with this.setAttribute() here so they exist on fresh elements
  }

  /**
   * retrieves the element name
   *
   * @return {string}
   */
  get name () {
    return this.constructor.name;
  }

  /**
   * Retrieves the node content by joining all children text elements with a line break
   *
   * @return {string}
   */
  get textContent () {
    return this
      .getElementsByNodeType( 'Text' )
      .reduce( ( textContent, currentElement ) => textContent + '\n' + currentElement.content, '' )
      .trim();
  }

  /**
   * Sets the node text content. This will append a single text node to the element.
   *
   * @param {string} newContent
   */
  set textContent ( newContent ) {
    const Text = require( './Text' );
    this.appendChild( new Text( newContent ) );
  }

  /**
   * Retrieves all element attributes
   *
   * @return {object} element attributes
   */
  get attributes () {
    return this._value.attributes;
  }

  /**
   * Sets all element attributes, disregarding any that might be set already.
   *
   * @param {object} newAttributes new attributes to set on the element
   */
  set attributes ( newAttributes ) {
    if ( !newAttributes instanceof Object ) {
      throw new TypeError( `attributes must be an object (${typeof newAttributes} given)` );
    }

    this._value.attributes = newAttributes;
  }

  /**
   * Retrieves an attribute from the element. Will return null if it does not exist.
   *
   * @param  {string} name attribute name
   * @return {*|null}      attribute value if found or null otherwise
   */
  getAttribute ( name ) {
    return this.hasAttribute( name ) ? this._value[ name ] : null;
  }

  /**
   * Checks whether an element has a attribute set.
   *
   * @param  {string}  name attribute name
   * @return {boolean}      whether an element has a attribute set
   */
  hasAttribute ( name ) {
    return this._value.attributes.hasOwnProperty( name );
  }

  /**
   * Sets an attribute on an element. If the element has the attribute set already, it will be
   * overwritten. Additionally, the attribute will be set on the element directly, unless it exists
   * as a property method already (including Node and Element constructors). Please note this does
   * not guard inherited class attributes since these will need to make sure for themselves.
   *
   * @param {string} name  attribute name
   * @param {*}      value attribute value
   */
  setAttribute ( name, value ) {
    this._value.attributes[ name ] = value;

    if ( !Element._guardedAttributes.has( name ) ) {

      // add the property to the instance, but proxy the getter and setter to the actual attribute
      Object.defineProperty( this, name, {
        configurable: true,
        enumerable:   true,
        get:          () => this._value.attributes[ name ],
        set:          newValue => this._value.attributes[ name ] = newValue
      } );
    }
  }

  /**
   * Removes an attribute from an element.
   *
   * @param {string} name name of the attribute to be deleted
   */
  removeAttribute ( name ) {
    if ( this.hasAttribute( name ) ) {
      delete this._value.attributes[ name ];

      if ( !Element._guardedAttributes.has( name ) ) {
        delete this[ name ];
      }
    }
  }

  /**
   * Retrieves a list of initial properties on both Node and Element that might not be overwritten.
   * The lookup is not cheap, but it's actually the most elegant way to retrieve ES6 class methods.
   * This prevents users from defining attributes on elements that might prevent them from working,
   * without having to maintain a list of static strings.
   *
   * @return  {Set} A set holding all attribute names. Sets have the advantage of holding unique
   *                keys and providing methods like `has`.
   * @private
   * @see https://stackoverflow.com/a/30881696/2532203
   */
  static get _guardedAttributes () {
    return new Set(
      Object.getOwnPropertyNames( Node.prototype ).concat(
        // TODO: Find a way to get the current prototype without being explicit. Seems impossible.
        Object.getOwnPropertyNames( Element.prototype )
      ) );
  }
}

/**
 * @type {Element}
 */
module.exports = Element;
