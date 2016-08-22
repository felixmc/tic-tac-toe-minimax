const Game = require('./game')
const view = require('./view')

const ai = require('./ai')
const human = require('./human')

game = new Game(ai, human)

game.listen(state => {
  view.draw(state.board)
})

game.play()
