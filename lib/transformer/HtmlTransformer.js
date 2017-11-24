'use strict';

/*
 global module,
 require
 */

const Transformer = require( './Transformer' );

class HtmlTransformer extends Transformer {
  constructor () {
    super();
  }

  _invoke ( document ) {
  }
}

module.exports = HtmlTransformer;
