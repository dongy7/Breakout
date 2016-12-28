# Breakout

## Pre-requisites

You need to install [Node](https://nodejs.org/) to develop the game.

First install the dependencies for the project:

```sh
$ npm install
```

## Usage

To run the dev version:

```sh
$ npm start
```

To run the production version:
```sh
$ npm run production
```

To deploy the game to Github Pages:
```sh
$ npm run deploy
```

Development builds will copy `phaser.min.js` together with `phaser.map` and `phaser.js`
Your ES6 code will be transpiled into ES5 and concatenated into a single file.
A sourcemap for your code will also be included (by default `game.map.js`).

Production builds will only copy `phaser.min.js`. Your ES6 code will be transpiled and
minified using UglifyJS.

Any modification to the files inside the `./src` and `./static` folder will trigger a full page reload.

If you modify the contents of other files, please manually restart the server.
