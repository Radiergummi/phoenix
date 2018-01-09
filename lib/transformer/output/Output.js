'use strict';

/*
 global module,
 require
 */

const Node      = require( '../../document/Node' ),
      Container = require( './Container' ),
      Entity    = require( './Entity' ),
      Index     = require( './Index' );

/**
 * Output tree
 * The output class represents the output of a transformer, eg. the complete output data. This
 * enables us once more to take advantage of data trees: Documentation output will most likely be
 * naturally structured that way - whether we're dealing with a file system (files in folders), a
 * database (documents for NoSQL or tables and rows for SQL) or a git repository. And even for
 * single output target scenarios, an Output instance can simply hold a single Entity instance.
 *
 * To describe the above structure in abstract terms, we use `Containers`, `Entities` and `Indices`.
 * A container solely holds other output nodes, an index is exactly that - an index of containers or
 * entities - and entities hold the actual content.
 */
class Output extends Node {

  // noinspection JSCheckFunctionSignatures
  /**
   * Overwrites appendChild to limit the number of possible children node types
   *
   * @param {Container|Entity|Index} node
   */
  appendChild ( node ) {
    if ( !this.constructor.isValidChildNode( node ) ) {
      throw new TypeError( `Can't append nodes of type ${node.constructor.name} to output nodes` );
    }

    super.appendChild( node );
  }

  // noinspection JSCheckFunctionSignatures
  /**
   * Overwrites appendChild to limit the number of possible children node types
   *
   * @param {Container|Entity|Index} node
   */
  prependChild ( node ) {
    if ( !this.constructor.isValidChildNode( node ) ) {
      throw new TypeError( `Can't prepend nodes of type ${node.constructor.name} to output nodes` );
    }

    super.prependChild( node );
  }

  static isValidChildNode ( node ) {
    return ([ Container, Entity, Index ].includes( node.constructor ));
  }

  /**
   * Retrieves the Container constructor
   *
   * @return {Container}
   */
  static get Container () {
    return Container;
  }

  /**
   * Retrieves the Entity constructor
   *
   * @return {Entity}
   */
  static get Entity () {
    return Entity;
  }

  /**
   * Retrieves the Index constructor
   *
   * @return {Index}
   */
  static get Index () {
    return Index;
  }
}

/**
 * @type {Output}
 */
module.exports = Output;
