# node-red-contrib-scrape-it

A <a href="http://nodered.org" target="_new">Node-RED</a> node that implements <a href="https://github.com/IonicaBizau/scrape-it">scrape-it</a> functionality.

## Install

Use the Manage Palette option in the Node-RED Editor menu.


## Usage

A node to scrape html of msg.payload to a JSON.
The transformation is defined by mapping property.

You can either define the mapping as a JSON-Object directly in the node, or you pass the mapping as a property `msg.mapping` directly to the scrape node.

If you need to specify **functions** (e.g. for the `how` or `convert` fields), you **have to** pass the mapping via the input (since JSON can not contain functions).


The mapping property is an object containing the scraping information.
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

## Examples

### JSON-Mapping (within the node)

```json
{
    "title": ".header h1",
    "desc": ".header h2",
    "avatar": {
        "selector": ".header img",
        "attr": "src"
    }
}
```

### JS-Mapping (provided with the input message)

First extend your flow with a function node directly in front of the scrape node:

<img width="471" alt="insert-function-node" src="https://user-images.githubusercontent.com/22354689/171995733-5f1a8f09-069f-4f6c-b867-1dbd37e3c70b.png">

Inside the function node, add a property `mapping` that contains your mapping (functions work aswell) (and leave the json-mapping within the Scrape-Node 

```js
return {
    ...msg, // leave the message untouched
    mapping: { // and add the mapping
        articles: {
            listItem: '.article',
            data: {
                // Get the article date and convert it into a Date object
                createdAt: {
                    selector: '.date',
                    convert: x => new Date(x)
                },
                // Get the title
                title: 'a.article-title',
                // Nested list
                tags: {
                    listItem: '.tags > span'
                }
            }        
        }
    }
}
```

## Contributors

[Scott Evans][scott]

## :scroll: License

[MIT][license] © [Borja Jimeno][website]





[license]: https://github.com/borjiso/node-red-contrib-scrape-it/blob/master/LICENSE
[website]: https://borjiso.github.io/
[scott]: https://github.com/scottsweb
