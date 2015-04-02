{
  title: "Candy Theme",
  date:  "2013-12-15",
  description: "Description of Candy's features"
}

Candy is a minimal blogging theme for [Cabin](http://cabinjs.com).

The theme's source code is located at the [Candy GitHub repo](https://github.com/CabinJS/Candy).

## Installation

To use Candy you must have [Node.js](http://nodejs.org/), [Python](http://www.python.org/) (for [Pygments](http://pygments.org/)), and [Compass](http://compass-style.org/) installed.

First install Cabin and Grunt globally with this command:

`
npm install -g cabin grunt-cli
`

Then scaffold a static site generator using the Candy theme with this command:

`
cabin new blog CabinJS/Candy
`

Now change into the `blog` directory and run the `grunt` command:

`
cd blog && grunt
`

This will build your site, start a static file server, open a browser tab with the site's homepage, and start a watch process to rebuild your site when source files change.

Try editing a markdown file in the `posts` folder or CSS in the `src/styles` folder and upon saving, your site will automatically be rebuilt with the updated content/styles. When you edit markdown, your browser will automatically refresh to view new content, and when editing styles, they will be injected directly into the page for an immediate update.

**Note: In the future, you can build your site by running the `grunt` command in the `blog` folder.**