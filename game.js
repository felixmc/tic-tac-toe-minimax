const utils = require('./utils')
const State = require('./state')

class Player {
  constructor (p, symbol) {
    this.getMove = p.getMove
    this.symbol = symbol
  }
}

module.exports = class Game {
  constructor (player1, player2, board) {
    this.state = new State(board || utils.emptyBoard())

    this.players = {
      x: new Player(player1, 'x'),
      o: new Player(player2, 'o')
    }

    this.listeners = []
  }

  listen (cb) {
    this.listeners.push(cb)
  }

  makeMove (move, player) {
    if (this.state.board[move] === ' ') {
      this.state = this.state.playMove(move)
      console.log('making move..', move, player)
      this.listeners.forEach(cb => cb(this.state))
    }
  }

  isOver () {
    if (utils.wins(this.state.board, 'x')) {
      console.log('PLAYER 1 WINS!')
      return true
    } else if (utils.wins(this.state.board, 'o')) {
      console.log('PLAYER 2 WINS!')
      return true
    } else if (utils.isFull(this.state.board)) {
      console.log('ITS A TIE')
      return true
    } else {
      return false
    }
  }

  play () {
    if (!this.isOver()) {
      const turn = this.players[this.state.turn]
      turn.getMove(this.state, move => {
        this.makeMove(move, this.state.turn)
        this.play()
      })
    }
  }
}
