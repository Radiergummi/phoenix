'use strict';

/*
 global module,
 require
 */

const utils = require( 'jsdoc-x' ).utils;

const Utility = require( './Utility' );

/**
 * @name Symbol
 * @type {object}
 */

/**
 * @name JSDocUtility
 * @description Provides a proxy to the JSDoc-X utils object
 *
 * @extends Utility
 * @class
*/
class JSDocUtility extends Utility {

  /**
   * Gets the full name of the given symbol.
   *
   * @param  {Symbol} symbol
   * @return {string}
   * @alias JSDocUtility#getLongName
   */
  static getFullName ( symbol ) {
    return utils.getFullName( symbol );
  }

  /**
   * Gets the code name of the given symbol.
   *
   * @param  {Symbol} symbol
   * @return {string}
   */
  static getCodeName ( symbol ) {
    return utils.getCodeName( symbol );
  }

  /**
   * Gets the (short) code-name of the given symbol.
   *
   * @param  {Symbol} symbol
   * @return {String}
   */
  static getName ( symbol ) {
    return utils.getName( symbol );
  }

  /**
   * Gets the first matching symbol by the given name.
   *
   * @param  {Array.<Symbol>} docs
   * @param  {string} name
   * @return {Object}
   */
  static getSymbolByName ( docs, name ) {
    return utils.getSymbolByName( docs, name );
  }

  /**
   * Builds and gets a flat array of symbol names from the given jsdoc-x parsed output.
   * Pass a comparator function for sorter or a pre-defined string "alphabetic" or "grouped".
   *
   * @param {Array.<Symbol>} docs
   * @param sorter
   * @return {Array}
   */
  static getSymbolNames ( docs, sorter ) {
    return utils.getSymbolNames( docs, sorter );
  }

  /**
   * Checks whether the given symbol has description.
   *
   * @param  {Symbol} symbol
   * @return {Boolean}
   */
  static hasDescription ( symbol ) {
    return utils.hasDescription( symbol );
  }

  /**
   * Checks whether the given symbol is a class.
   *
   * @param  {Symbol} symbol
   * @return {Boolean}
   */
  static isClass ( symbol ) {
    return utils.isClass( symbol );
  }

  /**
   * Checks whether the given symbol is a constructor.
   *
   * @param  {Symbol} symbol
   * @return {Boolean}
   */
  static isConstructor ( symbol ) {
    return utils.isConstructor( symbol );
  }

  /**
   * Checks whether the given symbol is marked with @deprecated.
   *
   * @param  {Symbol} symbol
   * @return {*}
   */
  static isDeprecated ( symbol ) {
    return utils.isDeprecated( symbol );
  }

  /**
   * Checks whether the given symbol is an enumeration.
   *
   * @param  {Symbol} symbol
   * @return {Boolean}
   */
  static isEnum ( symbol ) {
    return utils.isEnum( symbol );
  }

  /**
   * Checks whether the given symbol has global scope.
   *
   * @param  {Symbol} symbol
   * @return {Boolean}
   */
  static isGlobal ( symbol ) {
    return utils.isGlobal( symbol );
  }

  /**
   * Checks whether the given symbol is marked with @ignore.
   *
   * @param  {Symbol} symbol
   * @return {Boolean}
   */
  static isIgnored ( symbol ) {
    return utils.isIgnored( symbol );
  }

  /**
   * Checks whether the given symbol has an inner scope.
   *
   * @param  {Symbol} symbol
   * @return {Boolean}
   */
  static isInner ( symbol ) {
    return utils.isInner( symbol );
  }

  /**
   * Checks whether the given symbol is an instance member.
   *
   * @param  {Symbol} symbol
   * @return {Boolean}
   */
  static isInstanceMember ( symbol ) {
    return utils.isInstanceMember( symbol );
  }

  /**
   * Checks whether the given symbol is an instance method.
   *
   * @param  {Symbol} symbol
   * @return {Boolean}
   */
  static isInstanceMethod ( symbol ) {
    return utils.isInstanceMethod( symbol );
  }

  /**
   * Checks whether the given symbol is an instance property.
   *
   * @param  {Symbol} symbol
   * @return {Boolean}
   */
  static isInstanceProperty ( symbol ) {
    return utils.isInstanceProperty( symbol );
  }

  /**
   * Checks whether the given symbol is a namespace.
   *
   * @param  {Symbol} symbol
   * @return {Boolean}
   */
  static isNamespace ( symbol ) {
    return utils.isNamespace( symbol );
  }

  /**
   * Checks whether the given symbol is a property.
   *
   * @param  {Symbol} symbol
   * @return {Boolean}
   */
  static isProperty ( symbol ) {
    return utils.isProperty( symbol );
  }

  /**
   * Checks whether the given symbol is read-only.
   *
   * @param  {Symbol} symbol
   * @return {Boolean}
   */
  static isReadOnly ( symbol ) {
    return utils.isReadOnly( symbol );
  }

  /**
   * Checks whether the given symbol is a method.
   *
   * @param  {Symbol} symbol
   * @return {Boolean}
   */
  static isMethod ( symbol ) {
    return utils.isMethod( symbol );
  }

  /**
   * Checks whether the given symbol is a static member.
   *
   * @param  {Symbol} symbol
   * @return {Boolean}
   */
  static isStaticMember ( symbol ) {
    return utils.isStaticMember( symbol );
  }

  /**
   * Checks whether the given symbol is a static method.
   *
   * @param  {Symbol} symbol
   * @return {Boolean}
   */
  static isStaticMethod ( symbol ) {
    return utils.isStaticMethod( symbol );
  }

  /**
   * Checks whether the given symbol is a static property.
   *
   * @param  {Symbol} symbol
   * @return {Boolean}
   */
  static isStaticProperty ( symbol ) {
    return utils.isStaticProperty( symbol );
  }

  /**
   * Checks whether the given symbol is a custom type definition.
   *
   * @param  {Symbol} symbol
   * @return {Boolean}
   */
  static isTypeDef ( symbol ) {
    return utils.isTypeDef( symbol );
  }

  /**
   * Checks whether the given symbol has public access.
   *
   * @param  {Symbol} symbol
   * @return {Boolean}
   */
  static isPublic ( symbol ) {
    return utils.isPublic( symbol );
  }

  /**
   * Checks whether the given symbol has private access.
   *
   * @param  {Symbol} symbol
   * @return {Boolean}
   */
  static isPrivate ( symbol ) {
    return utils.isPrivate( symbol );
  }

  /**
   * Checks whether the given symbol has protected access.
   *
   * @param  {Symbol} symbol
   * @return {Boolean}
   */
  static isProtected ( symbol ) {
    return utils.isProtected( symbol );
  }

  /**
   * Checks whether the given symbol is undocumented. This checks if the symbol has any comments.
   *
   * @param  {Symbol} symbol
   * @return {Boolean}
   */
  static isUndocumented ( symbol ) {
    return utils.isUndocumented( symbol );
  }

  /**
   * Gets the value by the given object notation.
   *
   * @param  {Symbol} symbol
   * @param notation
   * @return {*}
   */
  static notate ( symbol, notation ) {
    return utils.notate( symbol, notation );
  }
}

module.exports = JSDocUtility;
