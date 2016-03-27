'use strict';
const fs = require('fs-promise')
    , path = require('path')
    , gameMatterDir = path.resolve(__dirname, '../games')
    , expect = require('expect.js')
    , isMyJsonValid = require('is-my-json-valid')
    , jsonSchema = require('../schemas/game/1.json')
    , validate = isMyJsonValid(jsonSchema)

function getFiles(){
  return fs
    .readdir(gameMatterDir)
    .then(files => Promise.all(files.map(file => fs.readJson(path.resolve(gameMatterDir, file)))))
}

describe('Games folder', function(){

  it('should be a directory', function(){
    fs
      .readdir(gameMatterDir)
      .then(files => (
        expect(files).to.be.an('array')
      ))
  })

})

describe('Games', function() {

  it('should all be valid', function() {
    return getFiles().then((games) => games.forEach(gameObj => {
      if(validate(gameObj)) {
        return true;
      } else {
        let message = `Validation of game schema failed:\n${validate.errors.map(e => `${e.field} ${e.message}`).join("\n")}\n\nFor:\n${JSON.stringify(gameObj)}`
        throw(new Error(message));
      }
    }));
  })

})
