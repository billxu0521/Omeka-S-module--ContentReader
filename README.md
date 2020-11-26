
# Note! this moudle is developing

ContentReader (module for Omeka S)
===================================

This module is a read-tool for content of item in [Omeka S].User can concentrate on read content of item in show page.this reader build on [Vue] - a JavaScript Framework.


Installation
------------
Uncompress files in the module directory and rename module folder `ContentReader`.
Then install it like any other Omeka module and follow the config instructions.

See general end user documentation for [Installing a module].

Usage
-----
After install module, `ContentReader` will auto show in `item` page.`ContentReader` is a read-tool that has two windows, the right side can be used to view the content, the left side can view the media(\*.png,\*.jpg or \*.pdf).The sort binding of the two windows is through the properties 'content' and the sort of 'media'.It is recommended that the paragraphs of the content of `item` are in the same order as the media of `item`.

* for pages
You can add new block `ContentReader` in pages setting, ContentReader of page can get all item in your sites.

* Blocks Disposition
If you use the module Blocks Disposition,you need set string:'ContentReader' in config of Blocks Disposition that `ContentReader` can show correctly.

Warning
-------

Use it at your own risk.

It’s always recommended to backup your files and your databases and to check
your archives regularly so you can roll back if needed.

- Option : GetSelection is not finished.

FutureWork
----------
- Interface with moudule `Selection` 
- classified by item set in pages mode 

Troubleshooting
---------------

See online issues on the [module issues] page on GitHub.


License
-------

This module is published under the MIT License.


Copyright
---------

* Copyright billxu, 2019-2020 (see [billxu] on GitHub)


[Omeka S]: https://omeka.org/s
[Installing a module]: http://dev.omeka.org/docs/s/user-manual/modules/#installing-modules
[CeCILL v2.1]: https://www.cecill.info/licences/Licence_CeCILL_V2.1-en.html
[GNU/GPL]: https://www.gnu.org/licenses/gpl-3.0.html
[FSF]: https://www.fsf.org
[OSI]: http://opensource.org
[billxu]: https://github.com/billxu0521 "Billxu"
[Vue]: https://vuejs.org/