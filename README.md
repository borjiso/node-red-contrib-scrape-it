# node-red-contrib-scrape-it

A <a href="http://nodered.org" target="_new">Node-RED</a> node that implements scrape-it functionality.

## Install

Use the Manage Palette option in the Node-RED Editor menu.


## Usage

A node to scrape html of msg.payload to a JSON.
The transformation is defined by mapping property.
This property is an object containing the scraping information.
  If you want to scrape a list, you have to use the `listItem` selector:

   - `listItem` (String): The list item selector.
   - `data` (Object): The fields to include in the list objects:
      - `<fieldName>` (Object|String): The selector or an object containing:
         - `selector` (String): The selector.
         - `convert` (Function): An optional function to change the value.
         - `how` (Function|String): A function or function name to access the
           value.
         - `attr` (String): If provided, the value will be taken based on
           the attribute name.
         - `trim` (Boolean): If `false`, the value will *not* be trimmed
           (default: `true`).
         - `closest` (String): If provided, returns the first ancestor of
           the given element.
         - `eq` (Number): If provided, it will select the *nth* element.
         - `texteq` (Number): If provided, it will select the *nth* direct text child.
           Deep text child selection is not possible yet.
           Overwrites the `how` key.
         - `listItem` (Object): An object, keeping the recursive schema of
           the `listItem` object. This can be used to create nested lists.

For the format of the selector, please refer to the [Selectors section of the Cheerio library](https://github.com/cheeriojs/cheerio#-selector-context-root-)


## :scroll: License

[MIT][license] © [Borja Jimeno][website]






[license]: /LICENSE
[website]: https://borjiso.github.io/