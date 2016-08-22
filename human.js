const readline = require('readline')

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

module.exports = {
  getMove (state, done) {
    rl.question('Enter a move: ', (answer) => {
      process.nextTick(() => {
        done(Number(answer))
      })
    })
  }
}
