#Bootstrap Cabin Installation
A combination of [Cabin JS Grunt Pages](https://github.com/CabinJS/grunt-pages) and [Twitter Bootstrap](https://github.com/twbs/bootstrap)
*****

Open terminal, cd to your project folder and install [Grunt](http://gruntjs.com/)

```
npm install -g grunt-cli
```

Install [Graphicsmagick](http://www.graphicsmagick.org/) for responsive images

```
brew install graphicsmagick
```
You need [Homebrew](http://brew.sh/) to install Graphicsmagick. Use the following command to install Homebrew

```
ruby -e "$(curl -fsSL https://raw.github.com/Homebrew/homebrew/go/install)"
```

Install Grunt Dependencies

```
npm install
```

Edit Gruntfile.js and the source files to your needs and run grunt

```
grunt
```

#To do
- Save the config of the menu in a seperate file. [More info](https://github.com/CabinJS/grunt-pages#data)