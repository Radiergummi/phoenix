'use strict';

/*
 global module,
 require
 */

const AbstractModule = require( '../AbstractModule' );

/**
 * @name Abstract Utility class
 * @description A Utility is a helper, essentially. The abstract base Utility provides some common
 * functionality to all helpers, including access to configuration, uniform management and logging
 * methods and singleton behavior.
 *
 * @abstract
 * @class
*/
class Utility extends AbstractModule {
  constructor ( options ) {
    super( options );
  }

  /**
   * Base method every Utility that inherits from this class should implement. Basically, it serves
   * the purpose of preparing the Utility for later use. To do so, you should construct an instance
   * of the utility with the arguments for the main method and call `invoke` on the instance later
   * on. This allows you to execute the same Utility method multiple times, should you need to.
   *
   * @stub
   */
  invoke () {

  }

  /**
   * creates a new Utility instance
   *
   * @param  {*}       args passes all args to the child Utility constructor
   * @return {Utility}
   */
  static create ( ...args ) {
    return new this( ...args );
  }

  /**
   * retrieves the current Utility instance or creates a new one, if none available
   *
   * @return {Utility}
   * @private
   */
  static get _instance () {
    if ( !this.__instance ) {
      this.__instance = this.create();
    }

    return this.__instance;
  }

}

module.exports = Utility;
