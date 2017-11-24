Document API
============
The document API provides an abstract interface to defining the individual components of a document,
without touching the actual implementation. Therefore, it can be plugged into any output system as 
long as it knows how to handle a Document instance.


The `Node` class
----------------
A node is a node within a tree structure. Each node can hold children nodes that in return hold 
their own children nodes. In fact, the `Document` class inherits from `Node` by itself. It carries 
some basic methods that you may know from browsers: `appendChild`, `removeChild`, `previousSibling`
and so on. You can find them [below](#node-api).


The `Document` instance
-----------------------
A document inherits from `Node`, therefore, all instances have access to the `Node` properties 
outlined below. Additionally, it provides the following:

### Properties
| Name      | Description                          |
|:---------:|--------------------------------------|
| `title`   | Getter/Setter for the document title |
| `pages`   | Retrieves all child pages            |
| `sources` | Retrieves all source nodes           |

### Methods
| Name      | Arguments                | Description                               |
|:---------:|--------------------------|-------------------------------------------|
| `merge`   | `...documents: Document` | Merges all documents into the current one |
| `addPage` | `name: string`           | Adds a new page to the document           |


Node API
--------
Nodes are the base prototype of any document node type. All node types that inherit from `Node` 
should expose their content properties directly.

### Properties
| Name              | Description                                                      |
|:------------------|:-----------------------------------------------------------------|
| `rootNode`        | Retrieves the root node of the current node                      |
| `length`          | Retrieves the amount of children nodes                           |
| `previousSibling` | Retrieves the previous sibling node                              |
| `nextSibling`     | Retrieves the next sibling node                                  |
| `firstChild`      | Retrieves the first child node                                   |
| `lastChild`       | Retrieves the last child node                                    |
| `isRootNode`      | Checks whether this is the root node in the tree                 |
| `nodeValue`       | Getter/Setter for the node content                               |
| `depth`           | Retrieves the nodes tree depth                                   |
| `nodeType`        | Retrieves the node type (defaults to the class constructor name) |
| `parentNode`      | Retrieves the parent node in the tree                            |

### Methods
| Name                    | Arguments                         | Description                         |
|:------------------------|:----------------------------------|-------------------------------------|
| `appendChild`           | `node: Node`                      | Appends a child node                |
| `prependChild`          | `node: Node`                      | Prepends a child node               |
| `removeChild`           | `node: Node`                      | Removes a child node                |
| `remove`                | none                              | Removes the node                    |
| `traverseUp`            | `iterator: function`              | Traverses the node tree upwards     |
| `traverseDown`          | `iterator: function`              | Traverses the node tree downwards   |
| `find`                  | `predicate: Node/string/function` | Finds a node by a predicate         |
| `getElementsByNodeType` | `nodeType: string`                | Retrieves all child nodes of a type |
| `toArray`               | none                              | Retrieves all child nodes as array  |
