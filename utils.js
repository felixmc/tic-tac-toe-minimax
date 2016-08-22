function emptyBoard () {
  return [' ', ' ', ' ',
          ' ', ' ', ' ',
          ' ', ' ', ' ']
}

function isFull (board) {
  return board
    .reduce((prev, cur) => {
       return prev && cur !== ' '
    }, true)
}

function isTerminal (board) {
  if (wins(board, 'x')) {
    return true
  } else if (wins(board, 'o')) {
    return true
  } else if (isFull(board)) {
    return true
  } else {
    return false
  }
}

function freeMoves (board) {
  return board
    .map((val, i) => ({val, i}))
    .filter(o => o.val === ' ')
    .map(o => o.i)
}

function wins (board, player) {
  const val = slices.reduce((prev, cur) => {
    return prev || cur.reduce((p, c) => {
      return p && board[c] === player
    }, true)
  }, false)

  return val
}

function playMove (board, move, player) {
  const newBoard = board.slice()
  newBoard[move] = player
  return newBoard
}

const slices = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8],
  [0, 3, 6], [1, 4, 7], [2, 5, 8],
  [0, 4, 8], [2, 4, 6]
]

module.exports = {
  emptyBoard,
  isFull,
  isTerminal,
  freeMoves,
  wins,
  playMove,
}
