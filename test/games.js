'use strict'
const fs = require('fs-promise')
    , path = require('path')
    , gameMatterDir = '../games'
    , expect = require('expect.js')

function getFiles(){
  return fs
    .readdir(gameMatterDir) 
    .then(files => (
      files
        .map(file => fs.readJson(path.resolve(gameMatterDir, file)))
        .then(gamePromises => Promise.all(gamePromises))
    ))
}

describe('Games folder and games', function(){
  
  it('should be a directory', function(){
    fs
      .readdir(gameMatterDir) 
      .then(files => (
        expect(files).to.be.an('array')
      ))
  })
  
  it('should have a name', function(){
    getFiles()
    .then(games => {
      games.forEach(game => {
          expect(game).to.have.property('name')
          expect(game.name).to.be.an('string')
        })
    })
  })
  
  it('should have a time', function(){
    getFiles()
    .then(games =>  games.forEach(game => {
      expect(game).to.have.property('time')
      expect(game.time).to.be.an('string')
    }))
  })
  
  it('should have players count', function(){
    getFiles()
    .then(games =>  games.forEach(game => {
      expect(game).to.have.property('players')
      
      expect(game.players).to.have.property('ideal')
      expect(game.players.ideal).to.be.an('array')
      
      expect(game.players).to.have.property('possible')
      expect(game.players.possible).to.be.an('array')
    }))
  })
  
  it('should have complexity', function(){
    getFiles()
    .then(games =>  games.forEach(game => {
      expect(game).to.have.property('complexity')
      
      expect(game.complexity).to.have.property('rules')
      expect(game.complexity.rules).to.be.an('string')
      
      expect(game.complexity).to.have.property('meta')
      expect(game.complexity.meta).to.be.an('string')
    }))
  })
  
  it('should have an overview', function(){
    getFiles()
    .then(games =>  games.forEach(game => {
      expect(game).to.have.property('overview')
      
      expect(game.overview).to.have.property('basic')
      expect(game.overview.basic).to.be.an('string')
    }))
  })
})