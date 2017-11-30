'use strict';

/*
 global module,
 require
 */
const EventEmitter = require( 'events' ).EventEmitter,
      mergeOptions = require( 'merge-options' );

/**
 * The generic prototype for all modules. It provides option merging and event emitter inheritance.
 *
 * @extends EventEmitter
 * @class
 */
class AbstractModule extends EventEmitter {

  /**
   * creates a new module instance
   *
   * @param {object} [options] module options
   *
   * @constructor
   */
  constructor ( options = {} ) {
    super();

    // deep merge options with defaults
    this._options = mergeOptions( this.constructor.defaultOptions, options );
  }

  /**
   * retrieves the default Module options. Needs to be implemented by child classes, otherwise it
   * will just return a plain object. These default options can be specified during the whole
   * prototype chain and should be merged further on.
   *
   * @return {object}
   * @stub
   */
  static get defaultOptions () {
    return {};
  }

  /**
   * retrieves a no-op callback
   *
   * @return {function(*): boolean}
   */
  static get noOp () {
    return _ => _;
  }
}

/**
 * @type {AbstractModule}
 */
module.exports = AbstractModule;
