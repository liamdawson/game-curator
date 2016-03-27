'use strict'
/* eslint-env mocha */
const fs = require('fs-promise')
const path = require('path')
const gameMatterDir = path.resolve(__dirname, '../games')
const expect = require('expect.js')
const isMyJsonValid = require('is-my-json-valid')
const jsonSchema = require('../schemas/game/1.json')
const validate = isMyJsonValid(jsonSchema)

function getFiles () {
  return fs
    .readdir(gameMatterDir)
    .then((files) => Promise.all(files.map((file) => fs.readJson(path.resolve(gameMatterDir, file)))))
}

describe('Games folder', function () {
  it('should be a directory', function () {
    fs
      .readdir(gameMatterDir)
      .then((files) => (
      expect(files).to.be.an('array')
      ))
  })
})

describe('Games', function () {
  it('should all be valid', function () {
    return getFiles().then((games) => games.forEach((gameObj) => {
      if (validate(gameObj)) {
        return true
      } else {
        let message = `Validation of game schema failed:
    ${validate.errors.map((e) => `${e.field} ${e.message}`).join('\n')}

    For:
    ${JSON.stringify(gameObj)}`
        throw (new Error(message))
      }
    }))
  })
})
