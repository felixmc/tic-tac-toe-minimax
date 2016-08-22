const utils = require('./utils')

module.exports = class State {
  constructor (board = utils.emptyBoard(), turn = 'x', depth = 0) {
    this.depth = depth
    this.board = board
    this.turn = turn
  }

  playMove (move) {
    const board = utils.playMove(this.board, move, this.turn)
    const turn = this.turn === 'x' ? 'o' : 'x'
    const depth = this.depth + 1
    return new State(board, turn, depth)
  }

  availableMoves () {
    return utils.freeMoves(this.board)
  }

  nextStates () {
    return this.availableMoves()
      .map(move => this.playMove(move))
  }

  isTerminal () {
    return utils.isTerminal(this.board)
  }
}
