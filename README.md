# Game Curator

[![GitHub license](https://img.shields.io/github/license/game-curator/game-curator.svg?style=flat-square)](https://github.com/game-curator/game-curator/blob/master/LICENSE.md)
[![](https://img.shields.io/github/issues-raw/game-curator/game-curator.svg?style=flat-square)](https://github.com/game-curator/game-curator/issues)
[![Travis](https://img.shields.io/travis/game-curator/game-curator.svg?style=flat-square)](https://travis-ci.org/game-curator/game-curator)
[![Dependency Status](https://www.versioneye.com/user/projects/56f6452935630e0029db0928/badge.svg?style=flat-square)](https://www.versioneye.com/user/projects/56f6452935630e0029db0928)
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat-square)](http://standardjs.com/)

> Latest release is running at https://game-curator.herokuapp.com/

Small app to put together a booklet of available board games for visitors.
[Here's a sample of the output.](sample.pdf)
[Contributions big and small welcome!](CONTRIBUTING.md)

## Installation Instructions for Contributors

1. Install [NodeJS](https://nodejs.org).
2. Run `npm install` in cloned source directory.
3. Run `npm start` to start the application.
4. Go to [http://localhost:3000](http://localhost:3000) to use the application.

## Utility methods

Format all of the game JSON files (assuming you're running a SH shell):

    for file in $(ls games/*.json); do; node_modules/.bin/json -o json -I -f $file; done

Format code to fit the project style:

    node_modules/.bin/standard-format -w

## Contributors

Thanks to:
* @eamq
* @jgimbel
* @CallumKerrEdwards
