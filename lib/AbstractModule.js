'use strict';

/*
 global module,
 require
 */
const EventEmitter = require( 'events' ).EventEmitter;

/**
 * The generic prototype for all modules
 *
 * @extends EventEmitter
 */
class AbstractModule extends EventEmitter {

  /**
   * creates a new module instance
   *
   * @param {object} [options] module options
   */
  constructor ( options = {} ) {
    super();

    // merge options with defaults
    this._options = Object.assign( this.constructor.defaultOptions, options );
  }

  /**
   * retrieves the default Module options. Needs to be implemented by child classes, otherwise it
   * will just return a plain object.
   *
   * @return {object}
   * @stub
   */
  static get defaultOptions () {
    return {};
  }

  /**
   * retrieves the Module name
   *
   * @return {string}
   */
  static get name () {
    return this.constructor.name;
  }

  /**
   * retrieves a no-op callback
   *
   * @return {function(*): boolean}
   */
  static get noOp () {
    return arg => true;
  }
}

/**
 * @type {AbstractModule}
 */
module.exports = AbstractModule;
