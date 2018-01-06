'use strict';

/*
 global module,
 require
 */

const uuid = require( 'uuid/v4' );

/**
 * Resembles a node in a document tree. It can be traversed and nested indefinitely.
 * Nodes are heavily "inspired" (aka stolen) from Arboreal (see link below). I made several
 * improvements upon the original code to let nodes behave more like actual document nodes in the
 * browser.
 *
 * @property {string} id node ID
 *
 * @class
 * @see https://github.com/afiore/arboreal
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
     * The Node ID is context dependent: It will always reflect the depth of a node within its tree.
     * The first digit is always zero, reflecting the root node. If the node is a child node, its
     * index number will be appended, separated by a colon.
     * Therefore, the ID will uniquely identify a node within a tree, but not among trees.
     *
     * @type {string}
     */
    this.id = (
      id.length > 0
        ? id
        : this.constructor._createNodeId( this.parentNode )
    );

    /**
     * Unique ID
     * In contrary to the Node ID, the unique ID identifies a node distinctly within and among trees
     * using the UUID module. That should be sufficiently unique even for absurdly large trees.
     * Providing the UID is required for deep document linking, since documents consist of a huge
     * number of sub trees, not necessarily all connected to the document root tree.
     *
     * @type {string}
     */
    this.uid = uuid();

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
    if ( typeof node === 'number' && this.childNodes[ node ] ) {
      return this.childNodes.splice( node, 1 ).shift();
    }

    if ( node instanceof Node ) {
      return this.constructor._removeNode( node );
    }

    throw new TypeError( `Invalid argument ${node}` );
  }

  /**
   * "removes" the node. Please note, however, that this is kind of like deleting a file from your
   * hard disk: The disk won't really erase the thing but rather drop all references pointing to it.
   * JavaScript objects can't be deleted, only their pointers.
   * That means you might create a serious memory leak if you create a large number of nodes and
   * reference them from somewhere else, while assuming calling `remove()` is enough to clean up
   * after yourself.
   *
   * @return {*}
   */
  remove () {
    return this.constructor._removeNode( this );
  }

  /**
   * traverse up the tree
   *
   * @param {function} iterator
   */
  traverseUp ( iterator ) {
    return this.constructor._traverse( this, iterator, this.constructor._traverseUp );
  }

  /**
   * traverse down the tree
   *
   * @param {function} iterator
   */
  traverseDown ( iterator ) {
    return this.constructor._traverse( this, iterator, this.constructor._traverseDown );
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
      iterator = node => {
        if ( predicate( node ) ) {
          match = node;
        }

        return false;
      };
    }

    // handle a node ID
    else if ( typeof predicate === 'string' ) {
      iterator = node => {
        if ( node.id === predicate || node.uid === predicate ) {
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
   * Checks whether this node descends from another node. Therefore, it iterates up the tree.
   *
   * @param  {Node}    candidate node to check for
   * @return {boolean}           whether this node descends from another
   */
  hasAncestor ( candidate ) {

    if ( !(candidate instanceof Node ) ) {
      throw new TypeError( `Invalid node type ${typeof candidate}` );
    }

    // check for same node
    if ( candidate === this ) {
      return false;
    }

    // check for different trees
    if ( candidate.rootNode !== this.rootNode ) {
      return false;
    }

    // check for directly descendant nodes
    if ( this.childNodes.includes( candidate ) ) {
      return false;
    }

    let found = false;

    this.traverseUp( node => {
      if ( node === candidate ) {
        found = true;

        return false;
      }
    } );

    return found;
  }

  /**
   * Checks whether another node descends from this one. Therefore, it iterates down the tree.
   *
   * @param  {Node}    candidate node to search for
   * @return {boolean}           whether the node descends from this one
   */
  hasDescendant ( candidate ) {
    if ( !(candidate instanceof Node ) ) {
      throw new TypeError( `Invalid node type ${typeof candidate}` );
    }

    // check for same node
    if ( candidate === this ) {
      return false;
    }

    // check for different trees
    if ( candidate.rootNode !== this.rootNode ) {
      return false;
    }

    // check for directly descendant nodes
    if ( this.childNodes.includes( candidate ) ) {
      return true;
    }

    let found = false;

    this.traverseDown( node => {
      if ( node === candidate ) {
        found = true;

        return false;
      }
    } );

    return found;
  }

  /**
   * Retrieves all nodes of a certain type. Note: This traverses the node tree down, starting from
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
   * Retrieves nodes by their UID
   *
   * @param  {string}    uid target node UID
   * @return {Node|null}     matching node or null for no match
   */
  getElementByUid ( uid ) {
    let match = null;

    this.traverseDown( node => {
      if ( node.uid === uid ) {
        match = node;

        return false;
      }
    } );

    return match;
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
   * @return {Node}
   */
  get nextSibling () {
    return this.parentNode.childNodes[ this.parentNode.childNodes.indexOf( this ) + 1 ];
  }

  /**
   * retrieves the first child node
   *
   * @return {Node}
   */
  get firstChild () {
    return this.childNodes[ 0 ];
  }

  /**
   * retrieves the last child node
   *
   * @return {Node}
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
   *
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
   *
   * @return {string}
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
    this.id          = this.constructor._createNodeId( this.parentNode );
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
      if ( !doContinue ) {
        return;
      }

      if ( iterator( node ) === false ) {

        //break the traversal loop if the iterator returns a falsy value
        doContinue = false;
      } else {
        for ( let newContext of node.childNodes ) {
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
    while ( context ) {
      if ( iterator( context ) === false ) {
        return;
      }

      for ( let node of context.childNodes ) {
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
            let id = node.uid,
                returned;

            if ( !visited.includes( id ) ) {

              // call the iterator with the node as context
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
   * Removes a node from its parent. Currently, it is impossible to remove a root node, due to
   * the way Javascript works: You cannot delete objects themselves, only references pointing to
   * them.
   *
   * @param  {Node} node
   * @private
   */
  static _removeNode ( node ) {
    if ( node.isRootNode ) {
      return;
    }

    let index = node.parentNode.childNodes.indexOf( node );

    // actually remove the node from its parent's list
    node.parentNode.childNodes.splice( index, 1 );

    node.parentNode = null;
  }

  /**
   * creates a node ID from the current tree position
   *
   * @param  {Node}   parentNode
   * @return {string}
   */
  static _createNodeId ( parentNode = null ) {
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
