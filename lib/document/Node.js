'use strict';

/**
 * Resembles a node in a document tree. It can be traversed and nested indefinitely.
 *
 * @property {string} id node ID
 *
 * @class
*/
class Node {

  /**
   * creates a new Node
   *
   * @param {Node}   parentNode node's parent node
   * @param {object} value      content of the node
   * @param {string} id         node ID
   *
   * @constructor
   */
  constructor ( value = {}, id = '', parentNode = null ) {

    /**
     * the Nodes direct parent node
     *
     * @type {Node}
     */
    this._parentNode = parentNode;

    /**
     * Node ID
     *
     * @type {string}
     */
    this.id = (
      id.length > 0
        ? id
        : Node.createNodeId( this.parentNode )
    );

    /**
     * Node data
     *
     * @type {object}
     */
    this._value = value;

    /**
     * Children nodes
     *
     * @type {Array.<Node>}
     */
    this.childNodes = [];
  }

  /**
   * appends a new child to the node
   *
   * @param  {Node} node
   * @return {Node}
   */
  appendChild ( node ) {
    // noinspection JSAnnotator, JSValidateTypes
    node.parentNode = this;
    this.childNodes.push( node );

    return node;
  }

  /**
   * prepends a new child to the node
   *
   * @param  {Node} node
   * @return {Node}
   */
  prependChild ( node ) {
    // noinspection JSAnnotator, JSValidateTypes
    node.parentNode = this;
    this.childNodes.unshift( node );

    // noinspection JSValidateTypes
    return this;
  }

  /**
   * removes a child node
   *
   * @param  {Node|number} node
   * @return {*}
   * @throws TypeError
   */
  removeChild ( node ) {
    if ( typeof node === 'number' && this.children[ node ] ) {
      return this.childNodes.splice( node, 1 ).shift();
    }

    if ( node instanceof Node ) {
      return Node._removeNode( node );
    }

    throw new TypeError( `Invalid argument ${node}` );
  }

  /**
   * removes the node
   *
   * @return {*}
   */
  remove () {
    return Node._removeNode( this );
  }

  /**
   * traverse up the tree
   *
   * @param {function} iterator
   */
  traverseUp ( iterator ) {
    return Node._traverse( this, iterator, Node._traverseUp );
  }

  /**
   * traverse down the tree
   *
   * @param {function} iterator
   */
  traverseDown ( iterator ) {
    return Node._traverse( this, iterator, Node._traverseDown );
  }

  /**
   * finds a node in the tree
   *
   * @param  {Node|string|function} predicate either a Node, a node ID or a custom iterator
   * @return {*}
   */
  find ( predicate ) {
    let match = null,
        iterator;

    // handle a custom iterator function
    if ( typeof predicate === 'function' ) {
      iterator = predicate;
    }

    // handle a node ID
    else if ( typeof predicate === 'string' ) {
      iterator = node => {
        if ( node.id === predicate ) {
          match = node;

          return false;
        }
      };
    }

    // handle a node instance
    if ( predicate instanceof Node ) {
      iterator = node => {
        if ( node === predicate ) {
          match = node;

          return false;
        }
      };
    }

    this.traverseDown( node => {
      if ( iterator.call( this, node ) ) {
        match = node;

        return false;
      }
    } );

    return match;
  }

  /**
   * retrieves all nodes of a certain type. Note: This traverses the node tree down, starting from
   * the current node.
   *
   * @param  {string} nodeType type of the node, which is their constructor name
   * @return {Array}
   */
  getElementsByNodeType ( nodeType ) {
    let matches = [];

    this.traverseDown( node => {
      if ( node.nodeType === nodeType ) {
        matches.push( node );
      }
    } );

    return matches;
  }

  /**
   * retrieves the root node
   *
   * @return {Node}
   */
  get rootNode () {
    let node = this;

    if ( !node.parentNode ) {
      return this;
    }

    while ( node.parentNode ) {
      node = node.parentNode;
    }

    return node;
  }

  /**
   * proxy to the child node length
   *
   * @return {number}
   */
  get length () {
    return this.childNodes.length;
  }

  /**
   * retrieves the previous sibling node
   *
   * @return {Node}
   */
  get previousSibling () {
    return this.parentNode.childNodes[ this.parentNode.childNodes.indexOf( this ) - 1 ];
  }

  /**
   * retrieves the next sibling node
   *
   * @param node
   * @return {*}
   */
  get nextSibling () {
    return this.parentNode.childNodes[ this.parentNode.childNodes.indexOf( this ) + 1 ];
  }

  /**
   * retrieves the first child node
   *
   * @return {*}
   */
  get firstChild () {
    return this.childNodes[ 0 ];
  }

  /**
   * retrieves the last child node
   *
   * @return {*}
   */
  get lastChild () {
    return this.childNodes[ this.childNodes.length - 1 ];
  }

  /**
   * checks whether this is a root node
   *
   * @return {boolean}
   */
  get isRootNode () {
    return !this.parentNode;
  }

  /**
   * retrieves the node value
   *
   * @return {object}
   */
  get nodeValue () {
    return this._value;
  }

  /**
   * sets the node value
   * @param {object} value
   */
  set nodeValue ( value ) {
    this._value = value;
  }

  /**
   * retrieves the node depth
   *
   * @return {number}
   */
  get depth () {
    return (
      this.parentNode
        ? this.parentNode.depth + 1
        : 0
    );
  }

  /**
   * retrieves the nodes constructor name
   */
  get nodeType () {
    return this.constructor.name;
  }

  /**
   * retrieves the parent node
   *
   * @return {Node}
   */
  get parentNode () {
    return this._parentNode;
  }

  /**
   * sets the parent node
   *
   * @param {Node} node
   */
  set parentNode ( node ) {
    this._parentNode = node;
    this.id          = Node.createNodeId( this.parentNode );
  }

  /**
   * retrieves all nodes as a flat array
   *
   * @return {Array}
   */
  toArray () {
    const nodeList = [];

    this.traverseDown( node => nodeList.push( node ) );

    return nodeList;
  }

  /**
   * traverses down the tree
   *
   * @param {Node}     context
   * @param {function} iterator
   * @private
   */
  static _traverseDown ( context, iterator ) {
    let doContinue = true;

    (/**
     * walks down the node tree
     *
     * @param {Node} node
     */
    function walkDown ( node ) {
      let newContext;

      if ( !doContinue ) {
        return;
      }

      if ( iterator( node ) === false ) {

        //break the traversal loop if the iterator returns a falsy value
        doContinue = false;
      } else {
        for ( let i = 0; i < node.childNodes.length; i++ ) {
          newContext = node.childNodes[ i ];
          walkDown( newContext );
        }
      }
    })( context );
  }

  /**
   * traverses up the node tree
   *
   * @param {Node}     context
   * @param {function} iterator
   * @private
   */
  static _traverseUp ( context, iterator ) {
    let node;

    while ( context ) {
      if ( iterator( context ) === false ) {
        return;
      }

      for ( let i = 0; i < context.childNodes.length; i++ ) {
        node = context.childNodes[ i ];

        if ( iterator( node ) === false ) {
          return;
        }
      }

      context = context.parentNode;
    }
  }

  /**
   * traverses the tree
   *
   * @param  {Node}     context
   * @param  {function} iterator
   * @param  {function} callback
   * @return {*}
   * @private
   */
  static _traverse ( context, iterator, callback ) {
    const visited      = [],

          /**
           *
           * @param  {Node} node
           * @return {*}
           */
          callIterator = function ( node ) {
            let id = node.id,
                returned;

            if ( !visited.includes( id ) ) {
              returned = iterator.call( node, node );

              visited.push( id );

              if ( returned === false ) {
                return returned;
              }
            }
          };

    return callback( context, callIterator );
  }

  /**
   * removes a node from its parent
   *
   * @param  {Node} node
   * @return {*}
   * @private
   */
  static _removeNode ( node ) {
    let parent = node.parentNode,
        child;

    for ( let i = 0; i < parent.children.length; i++ ) {
      child = parent.children[ i ];

      if ( child === node ) {
        return parent.children.splice( i, 1 ).shift();
      }
    }
  }

  /**
   * creates a node ID from the current tree position
   *
   * @param  {Node}   parentNode
   * @return {string}
   */
  static createNodeId ( parentNode = null ) {
    return (parentNode
        ? `${parentNode.id}:${parentNode.childNodes.length}`
        : '0'
    );
  }
}

/**
 * @type {Node}
 */
module.exports = Node;
