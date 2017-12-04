'use strict';

/*
 global module,
 require
 */

const Parser = require( './Parser' );

class ChainedParser extends Parser {
  constructor ( parsers) {
    super( ...args );

    this.parsers = parsers;
  }

  _invoke () {
    this.parsers.reduce( ( results, Parser ) => results.then( result => {
      let parser = new Parser( result, this.document, this._options );

      return parser.parse();
    } ), Promise.resolve() );
  }
}

module.exports = ChainedParser;
