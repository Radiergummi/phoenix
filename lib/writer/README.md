Writers
=======
Writers write the finished documentation to a destination. As with all other core modules, writers can and should be used for your specific use case. Something very common across open source projects, for example, would be publishing your documentation to your public documentation server, be it a GitHub repository or a private web server.  

Writers are designed in an way that allows them to work independently from file system concepts: While you will most probably work with files and directories, this file system concept does not apply to other environments like S3 buckets or databases. Therefore, we have **objects** (single documentation items with string content) **containers** (something that contains objects), **empty containers** (containers without objects within them) and **indices** (an object containing a list of other objects). More will be added while development continues.  
This lets any Transformer speak to any writer, since they both know what a certain documentation object represents.  
Any Writer can provide a list of types it supports, defaulting to all of them. While this does not serve a direct purpose yet, it will prevent surprises while working with third party writers and enable some "magic" in output handling.

All readers have two sources of input available to them: First and foremost, the documentation objects. The FileSystemWriter, for example, simply iterates and writes them to output files and directories. Due to the objects being `Node`s, they can be nested and will result in a directory tree.  
However, as all other modules, Writers also receive the current `document` and can use it to perform additional operations.


Ideas for writers
-----------------
Possible writers to include in Phoenix:

 - SFTPWriter
 - FTPWriter
 - S3Writer
 - GitWriter
 - GitHubWriter
 - SQLWriter
