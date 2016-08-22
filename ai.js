const utils = require('./utils')

function getMove (state, done) {
  const enemy = state.turn === 'x' ? 'o' : 'x'

  const moves = state.availableMoves()
    .map(move => {
      const nextState = state.playMove(move)
      return {
        move,
        score: minimax(nextState, state.turn, state.depth)
      }
    })

  // console.log('moves for', state.turn, moves)

  const best = moves
    .reduce((prev, cur) => {
      const scoreToBeat = prev[0].score

      if (cur.score > scoreToBeat) {
        return [cur]
      } else if (cur.score === scoreToBeat) {
        prev.push(cur)
      }

      return prev
    }, [moves[0]])

  const randomBest = best[Math.floor(Math.random() * best.length)]

  process.nextTick(() => {
    done(randomBest.move)
  })
}

function minimax (state, me, depth) {
  if (state.isTerminal()) return scoreState(state, me, depth)

  const enemy = me === 'x' ? 'o' : 'x'

  const pickScore = state.turn === me ? Math.max : Math.min
  let score = state.turn === me ? -1000 : 1000

  state.nextStates()
    .forEach(state => {
      const newScore = minimax(state, me, depth)
      score = pickScore(score, newScore)
    })

  // console.log(state.turn, ' scores ', score)

  return score
}

function scoreState (state, player, depth) {
  const enemy = player === 'x' ? 'o' : 'x'

  if (utils.wins(state.board, player)) {
    return 100 - (state.depth - depth)
  } else if (utils.wins(state.board, enemy)) {
    return -100 + (state.depth - depth)
  } else {
    return 0
  }
}

module.exports = {
  getMove,
}
