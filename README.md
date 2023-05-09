# Crossword Wrangler

To present ES crosswords in an easy-to-print format. Because print stylesheets are unable to cope with flex or grid elements properly the size/style of the rendered HTML has to be calculated from within the components, and then applied to the CSS using CSS variables.

Note, this isn't meant to be a crossword that you can fill out, although I may implement that functionality eventually.

![Crossword screenshot](https://github.com/andywillis/crossword-wrangler-rework/blob/main/documentation/crossword_screenshot.png)

## To Do

* Routing
* Proper date valiidation / separate lib
* Separate print lib
* Move `wrangle.js` `readFile` to `io`
* Redux
* Preact
