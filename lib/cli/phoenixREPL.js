'use strict';

/*
 global module,
 require
 */

const REPL = require( 'repl' ),
      vm   = require( 'vm' ),
      util = require( 'util' );

console.log( util.inspect.styles );
util.inspect.styles.name = 'blue';

const phoenixModules = {
  Document:            require( '../document/Document' ),
  Reader:              require( '../reader/Reader' ),
  Parser:              require( '../parser/Parser' ),
  Transformer:         require( '../transformer/Transformer' ),
  Writer:              require( '../writer/Writer' ),
  FileSystemReader:    require( '../reader/FileSystemReader' ),
  StdInReader:         require( '../reader/StdInReader' ),
  JSDocParser:         require( '../parser/JSDocParser' ),
  HTMLTransformer:     require( '../transformer/HtmlTransformer' ),
  MarkdownTransformer: require( '../transformer/MarkdownTransformer' ),
  FileSystemWriter:    require( '../writer/FileSystemWriter' ),
  StdOutWriter:        require( '../writer/StdOutWriter' )
};

const repl = REPL.start( {
  prompt: '[Phoenix]> ',
  eval:   myEval,
  writer: myWriter
} );

for ( let module in phoenixModules ) {
  if ( phoenixModules.hasOwnProperty( module ) ) {
    Object.defineProperty( repl.context, module, {
      configurable: false,
      enumerable:   true,
      value:        phoenixModules[ module ]
    } );
  }
}

function myEval ( cmd, context, filename, callback ) {
  let result;

  // result = vm.runInThisContext( cmd );
  result = vm.runInContext( cmd, context );

  if ( isPromise( result ) ) {
    result
      .then( resolvedResult => callback( null, resolvedResult ) )
      .catch( resolvedError => callback( null, resolvedError ) );
  } else {
    callback( null, result );
  }
}

function myWriter ( output ) {
  return util.inspect( output, {
    showHidden:  false,
    colors:      true,
    breakLength: 120
  } );
}

function isPromise ( obj ) {
  return (
    !!obj &&
    (typeof obj === 'object' || typeof obj === 'function') &&
    typeof obj.then === 'function'
  );
}
