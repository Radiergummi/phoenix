Phoenix [![Build status](https://teamcity.hades.9dev.de/app/rest/builds/buildType:(id:Phoenix_Build)/statusIcon)](https://teamcity.hades.9dev.de/project.html?projectId=Phoenix&branch_Phoenix=__all_branches__)
=======
*A lightweight and modular framework to document code projects*


Reasoning
---------
Born out of frustration while working on a Vue.js project, I decided to write something on my own. 
The amount of work to generate documentation for a simple project involving Vue.js components seemed
tedious to me: While there are certain packages that parse single file components, it seemed near 
impossible to get them to play nice with JSDoc or similar.  
What lacks to date is a modular framework that clearly separates parsing sources from writing output
files.  

Welcome to Phoenix.


Contents
--------

1. [Abstract Concept](#abstract-concept)
2. [Core Principles](#core-principles)
3. [Installation](#installation)
4. [Command line usage](#command-line-usage)
5. [Programmatic Usage](#programmatic-usage)
6. [Documents](#documents)
7. [Terminology](#terminology)
8. [Writing your own module](#writing-your-own-module)
9. [Builds](#builds)
10. [Attribution](#attribution)


Abstract Concept
----------------
Phoenix consists of five core building blocks:

1. **Readers**
   Readers are the first step in the chain: They *read source files*, obviously. By default, there 
   are only readers for STDIN and the file system, though you could create additional ones to read 
   from a deployment server, an HTTP resource or a Github repository.  
   [Continue reading...](./lib/reader/README.md)
   
2. **Parsers**  
   A parser *parses source code* and returns it as a *JavaScript representation*. It's sole 
   responsibility is to analyze the code passed to it as a string and return a `Document` (more on 
   that below). You might note this is not limited to JavaScript source: 
   A parser can parse any language.  
   [Continue reading...](./lib/parser/README.md)


3. **Transformers**  
   A transformer takes the previously generated document object and
   *transforms them into an output format*.  
   This might be HTML, XML, Markdown or even binary ASCII code if that's your thing.  
   [Continue reading...](./lib/transformer/README.md)


4. **Writers**  
   A writer takes the output data and *writes it to a target*. By default, as with readers there are
   only writers for STDOUT and the file system, but you could easily create one that writes to an S3
   bucket, a database or a git repository.  
   [Continue reading...](./lib/writer/README.md)

   
5. **Documents**  
   The Document object is an abstract representation of the documentation. Similar to the document
   in browsers, it is a tree structure with infinitely nested nodes. This makes it possible to
   document even the biggest projects cleanly.  
   [Continue reading...](#documents)


Therefore, the chain works as follows:
> **read input** → **parse input** → **transform AST** → **write output**  

Phoenix makes it possible to document just about anything, as long as it can be parsed using 
JavaScript.


Core principles
---------------
1. **Ease of use**: For the 90% use case, you should be able to install phoenix, pass it an input
   path and get your documentation.
2. **Modularity**: Extending Phoenix should be as easy as extending one of the abstract classes and
   pass the name as an option.
3. **Interoperability**: Phoenix should play nice with other tools, including CI servers, build
   chains and system tools.
4. **Implementation agnostic**: Phoenix should be able to read from anywhere, parse anything, build
   any output and write to anywhere. No limits.
5. **Stability**: New versions should follow Semver strictly and deprecate things slowly.


Installation
------------
> Note: Phoenix is currently in initial development and not ready for use at the moment. If you plan
to contribute, please have a look at the [Contributing section](#contributing).

Install the module:

```bash
// from the npm registry
npm install phoenix-docs

// from Github
npm install Radiergummi/phoenix
```


Command line usage
------------------
Phoenix provides a CLI application that can be found at [./bin/phoenix](./bin/phoenix)(.bat) or 
invoked with `npm run phoenix`. It does load Phoenix with the specified configuration and run it.

### Configuration files
By default, Phoenix uses a `.phoenixrc` file in the working directory. You can use the `-c` or 
`--config` switch to specify the path to another file, though.  
The PhoenixRC file is a single AMD module that exports an object. Contrary to JSON, this provides 
the ability to retrieve your settings from somewhere else or use values depending on the environment
(think CI or build servers).   
Note, however, that Phoenix out of itself does not make use of environment variables. That might be
changed if anyone can provide a use case where evaluating them in the config file is not possible, 
though. The config file has to be structured like so:  

```js
const Phoenix = require('phoenix');

module.exports = {
  
  // Holds general information about your project. Most values will be populated from the 
  // package.json, if found in the working directory.
  project: {
    
    // Project name
    name: String,
    
    // Project version. Defaults to 0.0.1
    version: String
  },
  
  // The next section holds all modules that should be loaded for the build process. All of them are
  // supplied as arrays to retain the correct order for module chains.
  
  // Holds all readers. Readers are executed in parallel, chaining them is not necessary. 
  readers: [
    
    // The default Phoenix modules are available as static properties on the Phoenix class
    Phoenix.FileSystemReader,
    
    // Third-party modules can be inserted using `require`
    require('phoenix-reader-s3')
  ],
  
  // Holds all parsers. Parsers are executed in parallel by default, but can be chained optionally.
  parsers: [
    
    // This parser will be executed in parallel with all others. So in order to just parse all 
    // files, you can simply include them here one after the other.
    require('phoenix-parser-php'),
    
    // This parser chains two or more parsers. They will be executed sequentially, receiving the 
    // files from the previous reader.
    new Phoenix.ChainedParser([
      Phoenix.VueComponentParser,
      Phoenix.JSDocParser
    ])
  ],
  
  // Holds all transformers. Transformers are executed in parallel, chaining them is not necessary. 
  transformers: [
    // ...
  ],
  
  // Holds all writers. Writers are executed in parallel, chaining them is not necessary. 
  writers: [
    // ...
  ],
  
  // this is the first options object for a Phoenix module. It will be passed down to the file 
  // system reader, as is. You can specify options for any module here, as long as you name the 
  // options object as the module class name. So, for `class MyAwesomeModule {}` that'd be
  // `MyAwesomeModule: {}`.
  // Any options you pass will be merged with the default options deeply. Phoenix will try to make
  // reasonable decisions by default, but you might want to modify some of them. All modules state
  // their default options in the documentation.
  FileSystemReader: {}
};
```


Programmatic Usage
------------------
By default, the only thing required is calling `run()` on a configured Phoenix instance. That will 
read the input and write documentation output. If you want to customize, whoever, the API is at your
hands at all times in the build process.
The API is available in two flavors: Either *event based* or *promise based*.
Every module is obliged to return a promise and emit events at certain points in the flow. You are 
not bound to one, of course: Promises and events mix just fine.

### Simple usage

```js
const phoenix = new Phoenix(options);

phoenix.run();
```

### Using Promises

```js
const phoenix = new Phoenix(options);

phoenix.createDocument('my project title')

// we can read arbitrary glob paths here if we use the FileSystemReader
.then(document => phoenix.read(['path1', 'path2']))

// at this point, we have an array of objects that describe all of our source files
.then(sourceFilesContent => phoenix.parse(sourceFilesContent))
	
```

Point of the code examples being, you can intervene at any point in the pipeline and do your thing 
with the current results, then continue.

### Using events
No surprises with event emitters: I used the ordinary `events` module. Phoenix emits all sorts of 
events, all of which you can find [in the table below](#event-list). You can hook into them and 
modify the current results at any time.

```js
const phoenix = new Phoenix(options);

phoenix.on('read:after', sourceFilesContent => console.log(sourceFilesContent));

phoenix.run();
```


Documents
---------
What would be the best way to maintain an output agnostic data format for documentation? It's 
already in there: A `Document`. And yes, it's similar to your everyday browser document, just a 
little stripped down and optimized for the use case.  
The Document object resembles a tree structure that holds nested document nodes. There is a basic
preset of different node types, but you can of course create new node types based on the existing.
The task of a transformer is to transform the document nodes into the output nodes. Consider this:
A `section` node might directly map to the `<section>` tag, while in markdown, it's just a new line.
An Overview of the `Document` API can be found in the 
[Document API documentation](./lib/document/README.md).


#### Event list
**This section is, as the whole project, still a work in progress.**

| Name     				  | Event properties | Description |
|:------------------|:-----------------|:------------|
| init      				| `ENV`, `options` | Phoenix initialisation. Receives current environment and the options Phoenix has retrieved from `ENV`, a CLI parameter or config file. 																	       |
| read:before 			|  | Before any read operation happens. 						 |
| read:init 				|  | When all read instances have been created. 		 |
| read:file 				|  | When a file is read. 													 |
| read:directory 		|  | When a directory is read. 											 |
| read:done 				|  | When all read operations have started. 				 |
| read:after      	|  | After all read operations are finished. 				 |
| parse:before      |  | Before any parse operation happens. 						 |
| parse:init      	|  | When all parse instances have been created.     |
| parse:file 				|  | When a file is parsed. 											   |
| parse:symbol 			|  | When a symbol is parsed. 											 |
| parse:method 			|  | When a method is parsed. 											 |
| parse:property 		|  | When a property is parsed. 										 |
| parse:class 			|  | When a class is parsed. 												 |
| parse:done 				|  | When all parse operations have started. 				 |
| parse:after 			|  | After all parse operations are finished. 			 |
| transform:before  |  | Before any transform operation happens.	 			 |
| transform:init 	  |  | When all transform instances have been created. |
| transform:file    |  | When the transform of a file is created. 			 |
| transform:section |  | When the transform of a section is created. 		 |
| transform:done    |  | When all transform operations have started. 		 |
| transform:after   |  | After all transform operations are finished. 	 |
| write:before 			|  | Before any write operation happens. 						 |
| write:init 				|  | When all write instances have been created. 		 |
| write:file 				|  | When a file is written. 												 |
| write:directory  	|  | When a directory is created. 									 |
| write:done				|  | When all write operations have started. 				 |
| write:after				|  | After all write operations are finished. 			 |

Additionally, each module has the possibility of emitting their own events. They will be proxied to
the Phoenix instance as `{{module prototype name}}:{{module class name}}:{{event name}}`. For 
example, should a transform module that creates XML output (*"FoobarXMLTransformer"*) emit a 
`newNode` event, it would be emitted like so: `transform:foobarxmltransformer:newNode`.


Terminology
===========
Phoenix uses several terms that might sound unfamiliar at first. This is necessary to distinguish 
between several states the subject code can take and to stay technology agnostic.

### Origin
An *origin* is a place to pull [sources](#source) from. This might be a file path, a database 
connection or a remote URI.
   
### Source
A *source* is an object representing a code fragment. At minimum, it has two properties: `name` and 
`code`, where `name` is the source identifier (for example a file path) and `code` is the actual 
source code that is subject to documentation.
   
### AST
*AST* is an abbreviation for *Abstract Syntax Tree*. It represents the abstract structure of any 
kind of source code. You can read more on the topic over at 
[Wikipedia](https://en.wikipedia.org/wiki/Abstract_syntax_tree).

### Documentation object
In lieu of a better word, I decided to call transformed documentation snippets (already in their
target output format) *objects*. This might be subject to change, though.  
An *object* refers to a [document node](#node) that holds transformed documentation text.

### Node
*Nodes* represent a single branch in the tree structure of a [document](#document). They can hold 
children nodes themselves and are roughly comparable to the 
[Browser node object](https://developer.mozilla.org/en/docs/Web/API/Node).

### Document
The *Document* class is the heart of Phoenix. The whole process of reading, parsing, transforming 
and writing code and documentation focuses on modifying a single `document` instance that holds the
origins, sources, documentation objects and output fragments.

Contributing
------------
Contributions are welcome at any time. If you're experiencing a problem with Phoenix, please 
[create a new issue](https://github.com/Radiergummi/phoenix/issues/new).  
Before submitting a new pull request, please read [CONTRIBUTING.md](./.github/CONTRIBUTING.md) for 
details on our code of conduct and the process for submitting pull requests.


Writing your own Phoenix module
-------------------------------
Phoenix has been designed to be a framework from the start. I wanted to make sure anyone can design,
implement and test modules for whatever purpose as easy as possible. That has been the driving force
behind many design decisions, too: Instead of a promise-based, object-oriented approach, using 
something based on streams would have been entirely possible, maybe even more efficient - but not as 
friendly to work with or build upon.  
To start off with your own module, you should first consult the general module documentation and 
have a look at some of the existing core modules. All of them inherit their base module, that is, a
class providing the general API Phoenix expects from the module, event emitter inheritance, error 
handling, option merging and logging. You don't need to take care of any of these, but you can, via
overwriting the parent properties and methods. Let's take a look at an example:  

```js
const Phoenix = require('phoenix');

class MyAwesomeReader extends Phoenix.Reader {
  
  /**
  * `_invoke` is the only required method for any module. Depending on what kind of module it is, a 
  * Reader in this case, it provides the main functionality.
  * 
  * @returns {Promise} 
	*/
  _invoke() {
    // we have access to `this.origins`, `this.document` and `this._options` already
  }
}
```
ß
This class is almost complete! You could include it in any Phoenix workflow, it just would not do 
anything actually useful. Inside the `_invoke` method, you should use the `this.document` property
to work with the code provided by the user. You can find detailed documentation on what is expected
from a module in the module documentation.


Builds
------
Phoenix is currently built [on my TeamCity server](https://teamcity.hades.9dev.de/project.html?projectId=Phoenix&branch_Phoenix=__all_branches__). You'll have guest access if you click on *Login as guest* below the login form.  
The TeamCity page provides several detailed reports, including code coverage and test sources, as well as documentation.


Attribution
-----------
Phoenix would not have been possible without the work of a lot of awesome people and open source 
projects, way too many to mention.  
There are some, however, that I'd like to mention specifically:

 - [Craig](https://github.com/craigchilds94) for joining in right from the start!
 - [onury](https://github.com/onury) from [jsdoc-x](https://github.com/onury/jsdoc-x) for providing 
   an almost-instant change to the library's error output
 - [rafaesc](https://github.com/rafaesc) from
   [vue-docgen-api](https://github.com/vue-styleguidist/vue-docgen-api) for including a method to 
   parse sources instead of files
