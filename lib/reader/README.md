Readers
=======
Readers take care of reading the code to document from some source. Phoenix is not limited to files:
The *source* can be anything that contains code, for example a git repository, a database or aN FTP 
server.  
To make this possible, Readers can be implemented as a specialized class that inherits from the base
`Reader`.

Basically, a Reader needs to implement a single, private method: `_invoke`. This method is required 
to return a promise holding the code sources Phoenix should document. You can find detailed API 
documentation on the Reader interface [below](#reader-api).

To write your own Reader, it might be beneficial to take a look at the factory Readers included with
Phoenix: `FileSystemReader` and `StdInReader`. The former is probably the most commonly used Reader 
since it allows to read files from any local file system origin.  
The `StdInReader` is a bit more limited: It reads whatever is piped to it from another command, so 
you are naturally limited to a single file. This might be beneficial if you use it on the command 
line to chain tools, though.


File system Reader *([Source](./FileSystemReader.js))*
------------------------------------------------------
The file system Reader basically just uses the FS module, so it can read whatever file or directory
there is on your local system. This should work flawlessly on *nix and Windows, the usual rules and
pitfalls apply (permissions, mount points, network shares).  
You can pass glob patterns to select multiple files. Documentation on the available patterns can be
found here: [Node-glob documentation](https://github.com/isaacs/node-glob#glob-primer).


Standard input Reader *([Source](./StdInReader.js))*
----------------------------------------------------
The standard input Reader is capable of reading a single file from STDIN. To process multiple files,
you need to call Phoenix multiple times. This can come in handy for specialized tool chains or 
existing documentation environments.


Reader API
----------
All Readers that inherit from the base `Reader` class acquire a lot of default behaviour: All events
are emitted automatically, errors are catched and origins will be automatically added to the 
documentation.  
There might be special cases where you will want to overwrite the default methods or write your own 
class, though. Take a look at the [Reader source](./Reader.js) to stay API compliant.

### Properties
| Name       | Description                                           |
|:----------:|-------------------------------------------------------|
| `origins`  | Holds all origins the Reader should process           |
| `document` | Holds the document object. Useful for storing origins |

### Methods
| Name      | Arguments | Expected return value | Description                                      |
|:---------:|-----------|-----------------------|--------------------------------------------------|
| `read`    | none      | `Promise.<[string]>` | Inherited from `Reader`. Calls `_invoke`          |
| `_invoke` | none      | `Promise.<[string]>` | Starts the reading process. Must return a promise |
